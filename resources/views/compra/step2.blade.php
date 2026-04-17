@extends('layout')
@section('title', 'Compra – Paso 2: Butacas')
@section('content')

@include('compra._progress', ['step' => 2])

<div class="grid gap-8 items-start max-w-6xl mx-auto my-10 px-6 lg:grid-cols-[minmax(0,1fr)_340px]">

    {{-- Panel principal del mapa de butacas --}}
    <div class="bg-white rounded-xl p-8 overflow-x-auto">

        <h2 class="text-red-700 text-xl font-bold text-center mb-1">Selecciona tus butacas</h2>
        <p class="text-center text-gray-500 text-sm mb-6">
            Debes seleccionar <strong id="numRequired">{{ $compra['num_entrades'] }}</strong> butaca(s).
        </p>

        @if(session('error'))
            <div class="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                {{ session('error') }}
            </div>
        @endif

        {{-- Leyenda de estados de butaca --}}
        <div class="flex flex-wrap justify-center gap-5 mb-6 text-xs">
            @foreach([
                ['bg-gray-400', 'Disponible'],
                ['bg-green-600', 'Seleccionada'],
                ['bg-red-600', 'Vendida'],
                ['bg-amber-500', 'Bloq. por otros'],
            ] as [$colorClass, $label])
            <div class="flex items-center gap-1.5">
                <div class="w-5 h-5 rounded {{ $colorClass }}"></div>
                <span class="text-gray-500">{{ $label }}</span>
            </div>
            @endforeach
        </div>

        {{-- Indicador de pantalla --}}
        <div class="text-center mb-6">
            <div class="inline-block w-3/5 h-2 rounded bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <div class="text-gray-400 text-[0.7rem] tracking-[3px] mt-1">PANTALLA</div>
        </div>

        {{-- Mapa de butacas generado dinámicamente desde la disposición de la sala --}}
        @php
            $rows       = $layout['rows'];
            $spr        = $layout['seatsPerRow'];
            $lastSeats  = $layout['lastRowSeats'];
            $takenSet   = array_flip($takenSeats);
            $lockedSet  = array_flip($lockedSeats);
            $mySet      = array_flip($myLocks);
            $rowLabels  = range('A', 'Z');
        @endphp

        <div class="overflow-x-auto pb-4">
        <table class="mx-auto border-separate [border-spacing:4px_3px]">
            @for($r = 0; $r < $rows; $r++)
            @php
                $seatsInThisRow = ($r === $rows - 1) ? $lastSeats : $spr;
                $rowLabel = $rowLabels[$r] ?? ($r + 1);
            @endphp
            <tr>
                <td class="text-gray-400 text-[0.7rem] w-[18px] text-right pr-1">{{ $rowLabel }}</td>

                @for($s = 1; $s <= $seatsInThisRow; $s++)
                @php
                    $id = $rowLabel . $s;
                    $isTaken  = isset($takenSet[$id]);
                    $isLocked = isset($lockedSet[$id]);
                    $isMine   = isset($mySet[$id]);

                    // Estado visual inicial de cada butaca (sin estilos inline)
                    if ($isTaken) {
                        $seatState = 'taken';
                        $seatClass = 'bg-red-600 cursor-not-allowed';
                        $title = 'Vendida';
                    } elseif ($isLocked) {
                        $seatState = 'locked';
                        $seatClass = 'bg-amber-500 cursor-not-allowed';
                        $title = 'Bloqueada';
                    } elseif ($isMine) {
                        $seatState = 'mine';
                        $seatClass = 'bg-green-600 cursor-pointer hover:scale-105';
                        $title = 'Seleccionada';
                    } else {
                        $seatState = 'free';
                        $seatClass = 'bg-gray-400 cursor-pointer hover:scale-105';
                        $title = 'Disponible';
                    }

                    $clickable = !$isTaken && !$isLocked;
                @endphp
                <td>
                    <button type="button"
                        data-seat="{{ $id }}"
                        data-state="{{ $seatState }}"
                        onclick="{{ $clickable ? 'toggleSeat(this)' : '' }}"
                        title="{{ $title }} {{ $id }}"
                        class="w-[22px] h-[22px] rounded border-0 text-[0.6rem] text-white/85 transition-transform duration-100 {{ $seatClass }}"
                        {{ !$clickable ? 'disabled' : '' }}>
                        {{ $s }}
                    </button>
                </td>
                @endfor

                <td class="text-gray-400 text-[0.7rem] w-[18px] pl-1">{{ $rowLabel }}</td>
            </tr>
            @endfor
        </table>
        </div>

        {{-- Formulario de envío con la lista de butacas seleccionadas --}}
        <form method="POST" action="{{ route('compra.step2.store') }}" id="step2form"
              class="mt-6 text-center">
            @csrf
            <input type="hidden" name="butaques" id="butaquesInput" value="">

            <p class="text-sm text-gray-500 mb-3">
                Seleccionadas: <strong id="selCount">0</strong> / {{ $compra['num_entrades'] }}
                &nbsp;·&nbsp;
                <span id="selList" class="text-green-600 font-semibold"></span>
            </p>

            <button type="submit" id="btnSeguent" disabled
                class="bg-gray-300 text-white rounded-full px-14 py-3
                       text-base font-bold tracking-widest uppercase cursor-not-allowed
                       transition-colors duration-200">
                SIGUIENTE
            </button>
        </form>
    </div>

    {{-- Sidebar de resumen --}}
    @include('compra._sidebar', ['sesion' => $sesion, 'step' => 2, 'compra' => $compra])
</div>

<script>
// Número de butacas que el usuario debe seleccionar (según entradas del paso 1)
const REQUIRED  = {{ $compra['num_entrades'] }};
const SESION_ID = {{ $sesion->id }};

// Butacas que ya tiene bloqueadas este usuario en esta sesión
let selected = new Set(@json($myLocks));

// Clases Tailwind por estado de butaca para mantener el mapa consistente
const SEAT_STATE_CLASS = {
    free: 'bg-gray-400 cursor-pointer hover:scale-105',
    mine: 'bg-green-600 cursor-pointer hover:scale-105',
    taken: 'bg-red-600 cursor-not-allowed',
    locked: 'bg-amber-500 cursor-not-allowed',
};

function setSeatState(btn, state) {
    btn.classList.remove('bg-gray-400', 'bg-green-600', 'bg-red-600', 'bg-amber-500', 'cursor-pointer', 'cursor-not-allowed', 'hover:scale-105');
    btn.classList.add(...SEAT_STATE_CLASS[state].split(' '));
    btn.dataset.state = state;
    const isBlocked = state === 'taken' || state === 'locked';
    btn.disabled = isBlocked;
}

// Actualiza la interfaz con el estado actual de la selección
function render() {
    document.querySelectorAll('[data-seat]').forEach(btn => {
        let seat  = btn.dataset.seat;
        let state = btn.dataset.state;
        if (state === 'taken' || state === 'locked') return;

        if (selected.has(seat)) {
            setSeatState(btn, 'mine');
        } else {
            setSeatState(btn, 'free');
        }
    });

    let list = Array.from(selected).sort();
    document.getElementById('selCount').textContent    = list.length;
    document.getElementById('selList').textContent     = list.join(', ');
    document.getElementById('butaquesInput').value     = list.join(',');

    let btn = document.getElementById('btnSeguent');
    if (list.length === REQUIRED) {
        btn.classList.remove('bg-gray-300', 'cursor-not-allowed');
        btn.classList.add('bg-[#1e3a5f]', 'hover:bg-[#152a45]', 'cursor-pointer');
        btn.disabled         = false;
    } else {
        btn.classList.remove('bg-[#1e3a5f]', 'hover:bg-[#152a45]', 'cursor-pointer');
        btn.classList.add('bg-gray-300', 'cursor-not-allowed');
        btn.disabled         = true;
    }
}

// Gestiona la selección/deselección de una butaca con bloqueo en el servidor
async function toggleSeat(btn) {
    let seat = btn.dataset.seat;

    if (selected.has(seat)) {
        // Liberar butaca ya seleccionada
        selected.delete(seat);
        await fetch('{{ route("seat.unlock") }}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': '{{ csrf_token() }}' },
            body: JSON.stringify({ sesion_id: SESION_ID, butaca: seat })
        });
        render();
    } else {
        // Si ya tenemos el máximo, liberar la más antigua antes de añadir la nueva
        if (selected.size >= REQUIRED) {
            let oldest = Array.from(selected)[0];
            selected.delete(oldest);
            await fetch('{{ route("seat.unlock") }}', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': '{{ csrf_token() }}' },
                body: JSON.stringify({ sesion_id: SESION_ID, butaca: oldest })
            });
        }
        // Intentar bloquear la butaca nueva en el servidor
        let res  = await fetch('{{ route("seat.lock") }}', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': '{{ csrf_token() }}' },
            body: JSON.stringify({ sesion_id: SESION_ID, butaca: seat })
        });
        let data = await res.json();

        if (data.ok) {
            selected.add(seat);
        } else {
            // Otro usuario acaba de tomar la butaca; actualizar visualmente
            setSeatState(btn, data.reason === 'taken' ? 'taken' : 'locked');
            alert('El asiento ' + seat + ' acaba de ser tomado por otro usuario.');
        }
        render();
    }
}

// Consulta el estado de las butacas cada 10 segundos para mantener la vista actualizada
async function pollSeats() {
    try {
        let res  = await fetch('/api/seats/' + SESION_ID);
        let data = await res.json();

        document.querySelectorAll('[data-seat]').forEach(btn => {
            let seat = btn.dataset.seat;

            if (data.taken.includes(seat) && !selected.has(seat)) {
                setSeatState(btn, 'taken');
                if (selected.has(seat)) { selected.delete(seat); render(); }
            } else if (data.locked.includes(seat) && !selected.has(seat)) {
                setSeatState(btn, 'locked');
            } else if (!data.taken.includes(seat) && !data.locked.includes(seat) && !selected.has(seat)) {
                if (btn.dataset.state === 'locked') {
                    // La butaca volvió a quedar libre
                    setSeatState(btn, 'free');
                }
            }
        });
    } catch(e) {}
}

// Estado inicial y polling de actualización automática
render();
setInterval(pollSeats, 10000);
</script>
@endsection
