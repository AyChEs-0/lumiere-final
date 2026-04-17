@extends('layout')
@section('title', 'Compra – Paso 1: Entradas')
@section('content')

{{-- Barra de progreso --}}
@include('compra._progress', ['step' => 1])

<div class="grid gap-8 items-start max-w-5xl mx-auto my-10 px-6"
     style="grid-template-columns: 1fr 340px;">
    {{-- Panel principal de selección de entradas --}}
    <div class="bg-white rounded-xl p-8">

        <h2 class="text-red-700 text-xl font-bold text-center mb-2">Selecciona tus entradas</h2>
        <p class="text-center text-gray-500 text-sm mb-8">
            Puedes comprar máximo <strong>10 entradas</strong> por transacción.
        </p>

        @if(session('error'))
            <div class="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                {{ session('error') }}
            </div>
        @endif

        <form method="POST" action="{{ route('compra.step1.store') }}" id="step1form">
            @csrf
            <input type="hidden" name="sesion_id" value="{{ $sesion->id }}">

            {{-- Tabla de tipos de entrada, estilo taquilla --}}
            <div class="border border-gray-200 rounded-lg overflow-hidden mb-8">

                {{-- Cabecera de sección --}}
                <div class="bg-gray-100 px-4 py-2 font-bold text-xs tracking-widest uppercase
                            text-gray-600 border-b border-gray-200">
                    TRADICIONAL
                </div>

                @foreach($tipus as $key => $info)
                <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-4 last:border-b-0">

                    {{-- Nombre y descripción del tipo de entrada --}}
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">{{ strtoupper($info['label']) }}</div>
                        @if($info['desc'])
                            <div class="text-gray-400 text-xs mt-0.5">{{ $info['desc'] }}</div>
                        @endif
                    </div>

                    {{-- Precio calculado según factor del tipo --}}
                    <div class="font-semibold text-gray-700 text-sm min-w-[55px] text-right">
                        {{ number_format($sesion->preu_base * $info['factor'], 1) }} €
                    </div>

                    {{-- Selector de cantidad con botones +/- --}}
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="changeQty('{{ $key }}', -1)"
                            class="w-8 h-8 border border-gray-300 rounded-full bg-white text-lg
                                   flex items-center justify-center text-gray-500
                                   hover:border-gray-400 hover:text-gray-700 transition-colors">&minus;</button>

                        <input type="number" name="entrades[{{ $key }}]" id="qty_{{ $key }}"
                               value="{{ $entrades[$key] ?? 0 }}" min="0" max="10" readonly
                               class="w-10 text-center border border-gray-300 rounded-md py-1
                                      text-sm font-bold bg-white text-gray-900">

                        <button type="button" onclick="changeQty('{{ $key }}', +1)"
                            class="w-8 h-8 border border-gray-300 rounded-full bg-white text-lg
                                   flex items-center justify-center text-gray-500
                                   hover:border-gray-400 hover:text-gray-700 transition-colors">+</button>
                    </div>
                </div>
                @endforeach
            </div>

            {{-- Botón de avanzar (deshabilitado hasta seleccionar al menos 1 entrada) --}}
            <div class="text-center">
                <button type="submit" id="btnSeguent"
                    class="bg-gray-300 text-white rounded-full px-14 py-3
                           text-base font-bold tracking-widest uppercase cursor-not-allowed
                           transition-colors duration-200"
                    disabled>
                    SIGUIENTE
                </button>
            </div>
        </form>
    </div>

    {{-- Sidebar de resumen --}}
    @include('compra._sidebar', ['sesion' => $sesion, 'step' => 1, 'compra' => null])
</div>

<script>
// Precios por tipo de entrada y lista de claves
const preus = @json(collect($tipus)->map(fn($t) => $sesion->preu_base * $t['factor']));
const keys  = @json(array_keys($tipus));
let totals = {};
keys.forEach(k => { totals[k] = 0; });

// Incrementa o decrementa la cantidad de un tipo de entrada
function changeQty(key, delta) {
    let el = document.getElementById('qty_' + key);
    let val = parseInt(el.value) + delta;
    let totalNow = keys.reduce((s, k) => s + parseInt(document.getElementById('qty_' + k).value), 0);
    if (delta > 0 && totalNow >= 10) return; // Máximo 10 entradas por compra
    val = Math.max(0, val);
    el.value = val;
    updateTotal();
}

// Actualiza el total del sidebar y el estado del botón de avanzar
function updateTotal() {
    let total = 0;
    let num = 0;
    keys.forEach(k => {
        let q = parseInt(document.getElementById('qty_' + k).value);
        total += q * preus[k];
        num += q;
    });
    let btn = document.getElementById('btnSeguent');
    if (num > 0) {
        btn.style.background = '#b91c1c';
        btn.style.cursor     = 'pointer';
        btn.style.opacity    = '1';
        btn.disabled         = false;
    } else {
        btn.style.background = '';
        btn.style.cursor     = 'not-allowed';
        btn.style.opacity    = '0.5';
        btn.disabled         = true;
    }
    let el = document.getElementById('sidebarTotal');
    if (el) el.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

// Estado inicial
updateTotal();
</script>
@endsection
