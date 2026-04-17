<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Sesion;
use App\Models\User;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * Lista todas las reservas del sistema.
     */
    public function index()
    {
        $reservas = Reserva::with('usuario', 'sesion')->get();
        return view('reservas.index', compact('reservas'));
    }

    /**
     * Muestra el formulario para crear una nueva reserva manualmente (uso de admin/taquilla).
     */
    public function create()
    {
        $usuarios = User::orderBy('name')->get();
        $sesiones = Sesion::with('pelicula', 'sala')->orderBy('fecha_hora')->get();
        return view('reservas.create', compact('usuarios', 'sesiones'));
    }

    /**
     * Guarda una nueva reserva.
     * - Si es un cliente: calculamos el precio en el servidor (no nos fiamos del cliente).
     * - Si es admin/taquilla: acepta todos los campos manualmente.
     */
    public function store(Request $request)
    {
        if (auth()->user()->rol === 'cliente') {
            // Flujo cliente: el precio lo calculamos nosotros para evitar que lo manipulen
            $validated = $request->validate([
                'fk_sesion_id'           => 'required|integer|exists:sesions,id',
                'tipus_entrada'          => 'required|in:adult,infantil,jubilat,discapacitat',
                'butaques_seleccionades' => 'required|string|max:500',
            ]);

            $sesion = Sesion::findOrFail($validated['fk_sesion_id']);
            $numSeats = count(array_filter(array_map('trim', explode(',', $validated['butaques_seleccionades']))));

            $discount = match ($validated['tipus_entrada']) {
                'infantil'     => 0.80,
                'jubilat'      => 0.70,
                'discapacitat' => 0.60,
                default        => 1.00,
            };

            $total = round($sesion->preu_base * $numSeats * $discount, 2);

            Reserva::create([
                'fk_usuario_id'          => auth()->id(),
                'fk_sesion_id'           => $validated['fk_sesion_id'],
                'tipus_entrada'          => $validated['tipus_entrada'],
                'butaques_seleccionades' => $validated['butaques_seleccionades'],
                'total_pagat'            => $total,
                'estat'                  => 'pendent',
            ]);

            return redirect()->route('reservas.mis')->with('success', 'Reserva realitzada correctament.');
        }

        // Flujo admin/taquilla: todos los campos se introducen manualmente
        $validated = $request->validate([
            'fk_usuario_id'          => 'required|integer|exists:users,id',
            'fk_sesion_id'           => 'required|integer|exists:sesions,id',
            'tipus_entrada'          => 'nullable|in:adult,infantil,jubilat,discapacitat',
            'butaques_seleccionades' => 'required|string|max:500',
            'total_pagat'            => 'required|numeric|min:0',
            'estat'                  => 'required|in:pendent,pagat,cancelat',
        ]);

        Reserva::create($validated);

        return redirect()->route('reservas.index')->with('success', 'Reserva creada correctament.');
    }

    /**
     * Muestra el detalle de una reserva. Los clientes solo pueden ver las suyas.
     */
    public function show(string $id)
    {
        $reserva = Reserva::with('usuario', 'sesion.pelicula', 'sesion.sala')->findOrFail($id);

        if (auth()->user()->rol === 'cliente' && $reserva->fk_usuario_id !== auth()->id()) {
            abort(403);
        }

        return view('reservas.show', compact('reserva'));
    }

    /**
     * Muestra el formulario para editar una reserva.
     */
    public function edit(string $id)
    {
        $reserva = Reserva::with('usuario', 'sesion')->findOrFail($id);
        $usuarios = User::orderBy('name')->get();
        $sesiones = Sesion::with('pelicula', 'sala')->orderBy('fecha_hora')->get();
        return view('reservas.edit', compact('reserva', 'usuarios', 'sesiones'));
    }

    /**
     * Actualiza una reserva en la base de datos.
     */
    public function update(Request $request, string $id)
    {
        $reserva = Reserva::findOrFail($id);

        $validated = $request->validate([
            'fk_usuario_id'          => 'required|integer|exists:users,id',
            'fk_sesion_id'           => 'required|integer|exists:sesions,id',
            'butaques_seleccionades' => 'required|string|max:500',
            'total_pagat'            => 'required|numeric|min:0',
            'estat'                  => 'required|in:pendent,pagat,cancelat',
        ]);

        $reserva->update($validated);

        return redirect()->route('reservas.index')->with('success', 'Reserva actualitzada correctament.');
    }

    /**
     * Elimina una reserva.
     */
    public function destroy(string $id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->delete();

        return redirect()->route('reservas.index')->with('success', 'Reserva eliminada correctamente.');
    }

    // -------------------------------------------------------
    // Métodos específicos para el rol cliente
    // -------------------------------------------------------

    /**
     * Muestra las reservas del usuario autenticado paginadas.
     */
    public function misReservas()
    {
        $reservas = auth()->user()->reservas()
            ->with('sesion.pelicula', 'sesion.sala')
            ->latest()
            ->paginate(10);

        return view('usuarios.misReservas', compact('reservas'));
    }

    /**
     * Vista del cliente para hacer una nueva reserva.
     * Solo muestra sesiones futuras e indica qué butacas ya están ocupadas.
     */
    public function reservar()
    {
        $sesiones = Sesion::with('pelicula', 'sala')
            ->where('fecha_hora', '>', now())
            ->orderBy('fecha_hora')
            ->get();

        // Para cada sesión, juntamos todas las butacas ocupadas (pendiente o pagada)
        $butaquesOcupades = [];
        foreach ($sesiones as $sesion) {
            $ocupades = [];
            $reservasActivas = Reserva::where('fk_sesion_id', $sesion->id)
                ->whereIn('estat', ['pendent', 'pagat'])
                ->pluck('butaques_seleccionades');
            foreach ($reservasActivas as $butaques) {
                foreach (explode(',', $butaques) as $butaca) {
                    $butaca = strtoupper(trim($butaca));
                    if ($butaca) {
                        $ocupades[] = $butaca;
                    }
                }
            }
            $butaquesOcupades[$sesion->id] = array_values(array_unique($ocupades));
        }

        return view('usuarios.reservar', compact('sesiones', 'butaquesOcupades'));
    }

    /**
     * Cancela una reserva pendiente. Solo puede hacerlo el dueño o un admin.
     */
    public function cancelar(Reserva $reserva)
    {
        // Solo el propio usuario o un admin pueden cancelar una reserva
        if (auth()->id() !== $reserva->fk_usuario_id && auth()->user()->rol !== 'admin') {
            abort(403, 'Accés denegat.');
        }

        if ($reserva->estat !== 'pendent') {
            return back()->with('error', 'Solo se pueden cancelar reservas en estado "pendiente".');
        }

        $reserva->update(['estat' => 'cancelat']);

        return redirect()->route('reservas.mis')->with('status', 'Reserva cancelada correctamente.');
    }
}
