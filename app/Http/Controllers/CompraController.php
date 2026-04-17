<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\SeatLock;
use App\Models\Sesion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CompraController extends Controller
{
    // Tipos de entrada disponibles con su descuento aplicado sobre el precio base
    const TIPUS = [
        'adult'   => ['label' => 'Adulto',        'desc' => '',                         'factor' => 1.00],
        'reduit'  => ['label' => 'Reducida',       'desc' => 'Menores 14 / Carnet joven', 'factor' => 0.80],
        'familia' => ['label' => 'Familia',        'desc' => 'Precio por persona',        'factor' => 0.82],
        'jubilat' => ['label' => 'Senior +65',     'desc' => '',                          'factor' => 0.70],
    ];

    // ─── PASO 1 — El usuario elige cuántas entradas de cada tipo quiere ──────

    public function step1(Request $request)
    {
        $sesionId = $request->query('sesion_id');
        if (! $sesionId) {
            return redirect()->route('peliculas.index')->with('error', 'Selecciona primero una sesión.');
        }

        $sesion = Sesion::with('pelicula', 'sala.cine')->findOrFail($sesionId);
        if ($sesion->fecha_hora->isPast()) {
            return redirect()->route('peliculas.index')->with('error', 'Esta sesión ya ha pasado.');
        }

        // Siempre empezamos desde cero: limpiamos bloqueos y datos de compra anteriores
        $this->releaseLocks();
        session()->forget('compra');

        $entrades = array_fill_keys(array_keys(self::TIPUS), 0);

        return view('compra.step1', [
            'sesion'  => $sesion,
            'tipus'   => self::TIPUS,
            'entrades' => $entrades,
        ]);
    }

    public function step1Store(Request $request)
    {
        $request->validate(['sesion_id' => 'required|integer|exists:sesions,id']);

        $sesion = Sesion::findOrFail($request->sesion_id);
        $entrades = [];
        $total = 0;
        $numEntrades = 0;

        foreach (self::TIPUS as $key => $info) {
            $qty = (int) $request->input("entrades.$key", 0);
            $qty = max(0, $qty);
            $entrades[$key] = $qty;
            $numEntrades += $qty;
            $total += round($sesion->preu_base * $info['factor'] * $qty, 2);
        }

        if ($numEntrades < 1) {
            return back()->with('error', 'Selecciona al menos 1 entrada.')->withInput();
        }
        if ($numEntrades > 10) {
            return back()->with('error', 'Máximo 10 entradas por transacción.')->withInput();
        }

        session([
            'compra' => [
                'sesion_id'    => $sesion->id,
                'entrades'     => $entrades,
                'num_entrades' => $numEntrades,
                'total'        => round($total, 2),
                'butaques'     => [],
            ],
        ]);

        return redirect()->route('compra.step2');
    }

    // ─── PASO 2 — El usuario elige sus butacas en el mapa de la sala ─────────

    public function step2(Request $request)
    {
        $compra = session('compra');
        if (! $compra) {
            return redirect()->route('peliculas.index');
        }

        $sesion = Sesion::with('pelicula', 'sala.cine')->findOrFail($compra['sesion_id']);
        SeatLock::clearExpired();

        // Butacas ya ocupadas por reservas confirmadas en la base de datos
        $takenSeats = Reserva::where('fk_sesion_id', $sesion->id)
            ->pluck('butaques_seleccionades')
            ->flatMap(fn($s) => array_map('trim', explode(',', $s)))
            ->filter()
            ->unique()
            ->values()
            ->all();

        // Butacas bloqueadas temporalmente por otros usuarios (no el actual)
        $myUserId = auth()->id();
        $myToken  = session()->getId();

        $lockedSeats = SeatLock::where('sesion_id', $sesion->id)
            ->where('expires_at', '>=', now())
            ->when($myUserId, fn($q) => $q->where('user_id', '!=', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', '!=', $myToken))
            ->pluck('butaca')
            ->all();

        // Bloqueos que tiene el propio usuario (butacas que ya seleccionó antes)
        $myLocks = SeatLock::where('sesion_id', $sesion->id)
            ->where('expires_at', '>=', now())
            ->when($myUserId, fn($q) => $q->where('user_id', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', $myToken))
            ->pluck('butaca')
            ->all();

        // Calculamos cómo se distribuyen las butacas en la sala (filas y columnas)
        $sala = $sesion->sala;
        $layout = $this->computeLayout($sala->capacidad, $sala->disposicion_butacas);

        return view('compra.step2', [
            'sesion'      => $sesion,
            'compra'      => $compra,
            'layout'      => $layout,
            'takenSeats'  => $takenSeats,
            'lockedSeats' => $lockedSeats,
            'myLocks'     => $myLocks,
            'tipus'       => self::TIPUS,
        ]);
    }

    public function step2Store(Request $request)
    {
        $compra = session('compra');
        if (! $compra) {
            return redirect()->route('peliculas.index');
        }

        $request->validate([
            'butaques' => 'required|string',
        ]);

        $butaques = array_filter(array_map('trim', explode(',', $request->butaques)));
        $butaques = array_values(array_unique($butaques));

        if (count($butaques) !== $compra['num_entrades']) {
            return back()->with('error', sprintf(
                'Debes seleccionar exactamente %d asientos (%d seleccionados).',
                $compra['num_entrades'],
                count($butaques)
            ));
        }

        SeatLock::clearExpired();

        $myUserId = auth()->id();
        $myToken  = session()->getId();
        $sesionId = $compra['sesion_id'];
        $sesion   = Sesion::findOrFail($sesionId);

        // Verificamos que ninguna butaca esté ocupada o bloqueada por otro usuario
        foreach ($butaques as $butaca) {
            // Comprueba si ya hay una reserva confirmada para esta butaca
            $taken = Reserva::where('fk_sesion_id', $sesionId)
                ->whereRaw("FIND_IN_SET(?, REPLACE(butaques_seleccionades, ' ', ''))", [$butaca])
                ->exists();
            if ($taken) {
                return back()->with('error', "El asiento $butaca ya está reservado. Vuelve a seleccionar.");
            }

            // Comprueba si otro usuario la tiene bloqueada temporalmente
            $locked = SeatLock::where('sesion_id', $sesionId)
                ->where('butaca', $butaca)
                ->where('expires_at', '>=', now())
                ->when($myUserId, fn($q) => $q->where('user_id', '!=', $myUserId))
                ->when(! $myUserId, fn($q) => $q->where('session_token', '!=', $myToken))
                ->exists();
            if ($locked) {
                return back()->with('error', "El asiento $butaca está siendo seleccionado por otro usuario. Vuelve a seleccionar.");
            }
        }

        // Borramos los bloqueos viejos del usuario y creamos los nuevos
        SeatLock::where('sesion_id', $sesionId)
            ->when($myUserId, fn($q) => $q->where('user_id', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', $myToken))
            ->delete();

        $expiresAt = now()->addMinutes(8);
        foreach ($butaques as $butaca) {
            SeatLock::create([
                'sesion_id'     => $sesionId,
                'butaca'        => $butaca,
                'user_id'       => $myUserId,
                'session_token' => $myToken,
                'expires_at'    => $expiresAt,
            ]);
        }

        // Guardamos las butacas elegidas en la sesión de compra
        $compra['butaques'] = $butaques;
        session(['compra' => $compra]);

        return redirect()->route('compra.step3');
    }

    // ─── PASO 3 — El usuario rellena sus datos y confirma el pago ───────────

    public function step3(Request $request)
    {
        $compra = session('compra');
        if (! $compra || empty($compra['butaques'])) {
            return redirect()->route('peliculas.index');
        }

        $sesion = Sesion::with('pelicula', 'sala.cine')->findOrFail($compra['sesion_id']);
        $user   = auth()->user();

        return view('compra.step3', [
            'sesion'     => $sesion,
            'compra'     => $compra,
            'tipus'      => self::TIPUS,
            'user'       => $user,
            'savedCard'  => $user?->tarjeta_guardada ?? null,
        ]);
    }

    public function step3Store(Request $request)
    {
        $compra = session('compra');
        if (! $compra || empty($compra['butaques'])) {
            return redirect()->route('peliculas.index');
        }

        $rules = [
            'nom'    => 'required|string|max:100',
            'email'  => 'required|email|max:150',
            'metode' => 'required|in:targeta,bizum',
        ];

        // Si paga con tarjeta nueva, validamos los campos del formulario de tarjeta
        if ($request->metode === 'targeta' && $request->input('card_mode') !== 'saved') {
            $rules['num_targeta']     = 'required|string|max:25';
            $rules['titular_targeta'] = 'required|string|max:100';
            $rules['expiry_targeta']  = ['required', 'regex:/^\d{2}\/\d{2}$/'];
            $rules['cvv_targeta']     = 'required|digits_between:3,4';
        }

        $request->validate($rules);

        SeatLock::clearExpired();

        $myUserId = auth()->id();
        $myToken  = session()->getId();
        $sesionId = $compra['sesion_id'];

        // Última comprobación: nos aseguramos de que las butacas siguen libres
        foreach ($compra['butaques'] as $butaca) {
            $taken = Reserva::where('fk_sesion_id', $sesionId)
                ->whereRaw("FIND_IN_SET(?, REPLACE(butaques_seleccionades, ' ', ''))", [$butaca])
                ->exists();
            if ($taken) {
                return redirect()->route('compra.step2')->with('error', "El asiento $butaca ha sido reservado por otro usuario mientras completabas el pago. Vuelve a seleccionar.");
            }
        }

        // Guardamos el tipo de entrada más numeroso como tipo principal de la reserva
        $dominant = array_search(max($compra['entrades']), $compra['entrades']);

        // Creamos la reserva en la base de datos
        $reserva = Reserva::create([
            'fk_usuario_id'          => $myUserId,
            'fk_sesion_id'           => $sesionId,
            'tipus_entrada'          => $dominant,
            'butaques_seleccionades' => implode(', ', $compra['butaques']),
            'total_pagat'            => $compra['total'],
            'estat'                  => 'pagat',
        ]);

        // Si el usuario quiere guardar la tarjeta, almacenamos los últimos 4 dígitos enmascarados
        if ($myUserId && $request->metode === 'targeta' && $request->input('card_mode') !== 'saved'
            && $request->boolean('guardar_targeta')) {
            $cardDigits = preg_replace('/\D/', '', $request->input('num_targeta', ''));
            if (strlen($cardDigits) >= 4) {
                $last4 = substr($cardDigits, -4);
                auth()->user()->update(['tarjeta_guardada' => "**** **** **** {$last4}"]);
            }
        }

        // Liberamos los bloqueos de butacas porque ya se han reservado
        SeatLock::where('sesion_id', $sesionId)
            ->when($myUserId, fn($q) => $q->where('user_id', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', $myToken))
            ->delete();

        // Guardamos los datos de confirmación para mostrarlos en la pantalla de éxito
        session([
            'compra_confirmada' => [
                'reserva_id' => $reserva->id,
                'nom'        => $request->nom,
                'email'      => $request->email,
                'butaques'   => $compra['butaques'],
                'total'      => $compra['total'],
            ],
        ]);

        session()->forget('compra');

        return redirect()->route('compra.confirmacio');
    }

    public function confirmacio(Request $request)
    {
        $data = session('compra_confirmada');
        if (! $data) {
            return redirect()->route('peliculas.index');
        }

        $reserva = Reserva::with('sesion.pelicula', 'sesion.sala.cine')->findOrFail($data['reserva_id']);

        return view('compra.confirmacio', [
            'reserva' => $reserva,
            'nom'     => $data['nom'],
            'email'   => $data['email'],
            'butaques' => $data['butaques'],
            'total'   => $data['total'],
        ]);
    }

    // ─── Cancelar compra — borra todo y vuelve a la cartelera ────────────────

    public function cancel()
    {
        $this->releaseLocks();
        session()->forget('compra');
        return redirect()->route('peliculas.index');
    }

    // ─── Función auxiliar: libera los bloqueos de butacas del usuario actual ──

    private function releaseLocks(): void
    {
        $sesionId = session('compra.sesion_id');
        if (! $sesionId) return;

        $myUserId = auth()->id();
        $myToken  = session()->getId();

        SeatLock::where('sesion_id', $sesionId)
            ->when($myUserId, fn($q) => $q->where('user_id', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', $myToken))
            ->delete();
    }

    // ─── AJAX — Consulta y bloqueo de butacas en tiempo real ─────────────────

    public function seatStatus(Request $request, int $sesionId)
    {
        SeatLock::clearExpired();
        $myUserId = auth()->id();
        $myToken  = session()->getId();

        $taken = Reserva::where('fk_sesion_id', $sesionId)
            ->pluck('butaques_seleccionades')
            ->flatMap(fn($s) => array_map('trim', explode(',', $s)))
            ->filter()->unique()->values()->all();

        $locked = SeatLock::where('sesion_id', $sesionId)
            ->where('expires_at', '>=', now())
            ->when($myUserId, fn($q) => $q->where('user_id', '!=', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', '!=', $myToken))
            ->pluck('butaca')->all();

        $mine = SeatLock::where('sesion_id', $sesionId)
            ->where('expires_at', '>=', now())
            ->when($myUserId, fn($q) => $q->where('user_id', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', $myToken))
            ->pluck('butaca')->all();

        return response()->json([
            'taken'  => array_values($taken),
            'locked' => array_values($locked),
            'mine'   => array_values($mine),
        ]);
    }

    public function lockSeat(Request $request)
    {
        $request->validate([
            'sesion_id' => 'required|integer|exists:sesions,id',
            'butaca'    => 'required|string|max:10',
        ]);

        SeatLock::clearExpired();

        $sesionId = $request->sesion_id;
        $butaca   = $request->butaca;
        $myUserId = auth()->id();
        $myToken  = session()->getId();

        // Already taken by reserva?
        $taken = Reserva::where('fk_sesion_id', $sesionId)
            ->whereRaw("FIND_IN_SET(?, REPLACE(butaques_seleccionades, ' ', ''))", [$butaca])
            ->exists();
        if ($taken) {
            return response()->json(['ok' => false, 'reason' => 'taken']);
        }

        // Already locked by another user?
        $otherLock = SeatLock::where('sesion_id', $sesionId)
            ->where('butaca', $butaca)
            ->where('expires_at', '>=', now())
            ->when($myUserId, fn($q) => $q->where('user_id', '!=', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', '!=', $myToken))
            ->exists();
        if ($otherLock) {
            return response()->json(['ok' => false, 'reason' => 'locked']);
        }

        // Create or refresh my lock
        SeatLock::updateOrCreate(
            ['sesion_id' => $sesionId, 'butaca' => $butaca],
            [
                'user_id'       => $myUserId,
                'session_token' => $myToken,
                'expires_at'    => now()->addMinutes(8),
            ]
        );

        return response()->json(['ok' => true]);
    }

    public function unlockSeat(Request $request)
    {
        $request->validate([
            'sesion_id' => 'required|integer|exists:sesions,id',
            'butaca'    => 'required|string|max:10',
        ]);

        $myUserId = auth()->id();
        $myToken  = session()->getId();

        SeatLock::where('sesion_id', $request->sesion_id)
            ->where('butaca', $request->butaca)
            ->when($myUserId, fn($q) => $q->where('user_id', $myUserId))
            ->when(! $myUserId, fn($q) => $q->where('session_token', $myToken))
            ->delete();

        return response()->json(['ok' => true]);
    }

    // ─── Helpers ──────────────────────────────────────────────────────────

    private function computeLayout(int $capacidad, string $disposicion): array
    {
        $seatsPerRow = match (strtolower($disposicion)) {
            'vip'     => 8,
            'premium' => 12,
            default   => 14, // Estándar
        };

        $rows = (int) ceil($capacidad / $seatsPerRow);
        $lastRowSeats = $capacidad - ($rows - 1) * $seatsPerRow;

        return [
            'rows'         => $rows,
            'seatsPerRow'  => $seatsPerRow,
            'lastRowSeats' => $lastRowSeats,
            'total'        => $capacidad,
        ];
    }
}
