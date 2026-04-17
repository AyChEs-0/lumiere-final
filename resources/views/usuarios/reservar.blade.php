@extends('layout')

@section('title', 'Fer una Reserva')

@section('content')
<div class="container" style="max-width: 820px; padding-top: 3rem; padding-bottom: 3rem;">

    <h1 class="page-title" style="margin-bottom: 2rem;">FER UNA RESERVA</h1>

    @if ($errors->any())
        <div class="alert alert-error" style="margin-bottom: 1.5rem;">
            @foreach ($errors->all() as $error)
                <p style="margin: 0.2rem 0;">⚠ {{ $error }}</p>
            @endforeach
        </div>
    @endif

    <form method="POST" action="{{ route('reservas.store') }}" id="reservaForm">
        @csrf

        {{-- ── Step 1: Selecció de sessió ── --}}
        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <h2 style="color: var(--color-accent); font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">① Selecciona la Sessió</h2>

            <div class="form-group" style="margin-bottom: 0;">
                <label for="fk_sesion_id" class="form-label">Sessió disponible</label>
                <select id="fk_sesion_id" name="fk_sesion_id" class="form-select" required onchange="onSessionChange(this.value)">
                    <option value="">-- Tria una sessió --</option>
                    @foreach($sesiones as $sesion)
                        <option value="{{ $sesion->id }}" {{ old('fk_sesion_id') == $sesion->id ? 'selected' : '' }}>
                            🎬 {{ $sesion->pelicula->titulo }}
                            &nbsp;|&nbsp; {{ $sesion->sala->nombre }}
                            &nbsp;|&nbsp; {{ $sesion->fecha_hora->format('d/m/Y H:i') }}
                            &nbsp;|&nbsp; {{ number_format($sesion->preu_base, 2) }}€/butaca
                        </option>
                    @endforeach
                </select>
                @error('fk_sesion_id')<p class="form-error">{{ $message }}</p>@enderror
            </div>
        </div>

        {{-- ── Step 2: Tipus d'entrada ── --}}
        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <h2 style="color: var(--color-accent); font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">② Tipus d'Entrada</h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem;" id="tipusGrid">
                @php
                    $tipusOptions = [
                        'adult'        => ['label' => 'Adult',          'icon' => '🧑', 'desc' => 'Tarifa normal (100%)'],
                        'infantil'     => ['label' => 'Infantil',       'icon' => '🧒', 'desc' => 'Fins a 12 anys (−20%)'],
                        'jubilat'      => ['label' => 'Jubilat / ≥65',  'icon' => '👴', 'desc' => '+65 anys (−30%)'],
                        'discapacitat' => ['label' => 'Discapacitat',   'icon' => '♿', 'desc' => 'Cap. ≥33% (−40%)'],
                    ];
                @endphp
                @foreach($tipusOptions as $val => $opt)
                    <label class="tipus-card {{ old('tipus_entrada', 'adult') === $val ? 'selected' : '' }}" data-val="{{ $val }}"
                           style="cursor: pointer; display: flex; flex-direction: column; align-items: center; padding: 1rem 0.75rem; border-radius: 10px; border: 2px solid var(--border-subtle); transition: all 0.15s; text-align: center; user-select: none;">
                        <input type="radio" name="tipus_entrada" value="{{ $val }}" style="display:none;"
                               {{ old('tipus_entrada', 'adult') === $val ? 'checked' : '' }} onchange="updatePrice()">
                        <span style="font-size: 1.8rem; margin-bottom: 0.4rem;">{{ $opt['icon'] }}</span>
                        <span style="font-weight: 700; color: var(--color-text); font-size: 0.9rem;">{{ $opt['label'] }}</span>
                        <span style="color: var(--color-text-secondary); font-size: 0.75rem; margin-top: 0.2rem;">{{ $opt['desc'] }}</span>
                    </label>
                @endforeach
            </div>
            @error('tipus_entrada')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        {{-- ── Step 3: Selector de butaques ── --}}
        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;" id="seatSection">
            <h2 style="color: var(--color-accent); font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">③ Selecciona les Butaques</h2>

            <div id="seatPlaceholder" style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">
                Selecciona una sessió per veure les butaques disponibles.
            </div>

            <div id="seatGrid" style="display: none;">
                {{-- Screen --}}
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="display: inline-block; background: linear-gradient(to bottom, var(--color-accent), transparent); width: 60%; height: 6px; border-radius: 4px;"></div>
                    <p style="color: var(--color-text-secondary); font-size: 0.75rem; letter-spacing: 0.15em; margin-top: 0.4rem;">PANTALLA</p>
                </div>

                {{-- Seat buttons --}}
                <div id="seatButtons" style="display: flex; flex-direction: column; gap: 6px; align-items: center;"></div>

                {{-- Legend --}}
                <div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap; font-size: 0.8rem; color: var(--color-text-secondary);">
                    <span><span style="display:inline-block;width:14px;height:14px;background:var(--color-bg-elevated);border:1px solid var(--border-subtle);border-radius:3px;vertical-align:middle;margin-right:4px;"></span>Disponible</span>
                    <span><span style="display:inline-block;width:14px;height:14px;background:var(--color-accent);border-radius:3px;vertical-align:middle;margin-right:4px;"></span>Seleccionada</span>
                    <span><span style="display:inline-block;width:14px;height:14px;background:#444;border-radius:3px;vertical-align:middle;margin-right:4px;"></span>Ocupada</span>
                </div>
            </div>

            <input type="hidden" name="butaques_seleccionades" id="butaquesInput" value="{{ old('butaques_seleccionades', '') }}">
            @error('butaques_seleccionades')<p class="form-error">{{ $message }}</p>@enderror
        </div>

        {{-- ── Step 4: Resum de preu ── --}}
        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;" id="priceSection">
            <h2 style="color: var(--color-accent); font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">④ Resum</h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                <tr>
                    <td style="padding: 0.3rem 0; color: var(--color-text-secondary);">Butaques seleccionades</td>
                    <td id="summarySeats" style="text-align: right; font-weight: 600;">—</td>
                </tr>
                <tr>
                    <td style="padding: 0.3rem 0; color: var(--color-text-secondary);">Preu base per butaca</td>
                    <td id="summaryBase" style="text-align: right; font-weight: 600;">—</td>
                </tr>
                <tr>
                    <td style="padding: 0.3rem 0; color: var(--color-text-secondary);">Descompte</td>
                    <td id="summaryDiscount" style="text-align: right; font-weight: 600;">—</td>
                </tr>
                <tr style="border-top: 1px solid var(--border-subtle);">
                    <td style="padding: 0.6rem 0; font-size: 1.1rem; font-weight: 700; color: var(--color-accent);">TOTAL A PAGAR</td>
                    <td id="summaryTotal" style="text-align: right; font-size: 1.1rem; font-weight: 700; color: var(--color-accent);">0,00 €</td>
                </tr>
            </table>

            <input type="hidden" name="total_pagat" id="totalInput" value="0">
        </div>

        {{-- Submit --}}
        <div style="display: flex; gap: 1rem;">
            <button type="submit" class="btn btn-primary" id="submitBtn" disabled
                    style="opacity: 0.5; cursor: not-allowed;">
                Confirmar Reserva
            </button>
            <a href="{{ route('reservas.mis') }}" class="btn btn-secondary">Cancel·lar</a>
        </div>
    </form>
</div>

{{-- ── JavaScript ── --}}
<script>
// Data injected from controller
const sesionesData = @json($sesiones->map(fn($s) => [
    'id'           => $s->id,
    'preu_base'    => (float) $s->preu_base,
    'capacidad'    => $s->sala->capacidad,
])->keyBy('id'));

const butaquesOcupades = @json($butaquesOcupades);

const DISCOUNTS = {
    adult:        1.00,
    infantil:     0.80,
    jubilat:      0.70,
    discapacitat: 0.60,
};

const DISCOUNT_LABELS = {
    adult:        '0%',
    infantil:     '−20%',
    jubilat:      '−30%',
    discapacitat: '−40%',
};

let selectedSeats = [];

// ── Tipus d'entrada card selection ──
document.querySelectorAll('.tipus-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.tipus-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input[type="radio"]').checked = true;
        updatePrice();
    });
});

// ── Session change ──
function onSessionChange(sessionId) {
    selectedSeats = [];
    document.getElementById('butaquesInput').value = '';
    if (!sessionId) {
        document.getElementById('seatGrid').style.display = 'none';
        document.getElementById('seatPlaceholder').style.display = 'block';
        updatePrice();
        return;
    }
    buildGrid(parseInt(sessionId));
    updatePrice();
}

// ── Build seat grid ──
function buildGrid(sessionId) {
    const sesion = sesionesData[sessionId];
    if (!sesion) return;

    const ocupades = butaquesOcupades[sessionId] || [];
    const capacity = sesion.capacidad;
    const cols = 10;
    const rows = Math.ceil(capacity / cols);
    const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const container = document.getElementById('seatButtons');
    container.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.style.cssText = 'display:flex;gap:5px;align-items:center;';

        // Row label
        const label = document.createElement('span');
        label.textContent = rowLetters[r];
        label.style.cssText = 'width:18px;text-align:right;color:var(--color-text-secondary);font-size:0.75rem;flex-shrink:0;';
        rowDiv.appendChild(label);

        for (let c = 1; c <= cols; c++) {
            const seatNum = r * cols + c;
            if (seatNum > capacity) break;
            const seatId = rowLetters[r] + c;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.dataset.seat = seatId;
            btn.title = seatId;
            btn.style.cssText = 'width:28px;height:28px;border-radius:5px;border:1px solid var(--border-subtle);font-size:0.65rem;font-weight:600;cursor:pointer;transition:all 0.12s;';

            if (ocupades.includes(seatId)) {
                btn.disabled = true;
                btn.style.background = '#444';
                btn.style.borderColor = '#555';
                btn.style.color = '#666';
                btn.style.cursor = 'not-allowed';
                btn.textContent = seatId;
            } else {
                btn.style.background = 'var(--color-bg-elevated)';
                btn.style.color = 'var(--color-text-secondary)';
                btn.textContent = seatId;
                btn.addEventListener('click', () => toggleSeat(btn, seatId));
            }
            rowDiv.appendChild(btn);
        }
        container.appendChild(rowDiv);
    }

    document.getElementById('seatPlaceholder').style.display = 'none';
    document.getElementById('seatGrid').style.display = 'block';
}

// ── Toggle seat selection ──
function toggleSeat(btn, seatId) {
    const idx = selectedSeats.indexOf(seatId);
    if (idx === -1) {
        selectedSeats.push(seatId);
        btn.style.background = 'var(--color-accent)';
        btn.style.borderColor = 'var(--color-accent)';
        btn.style.color = '#000';
    } else {
        selectedSeats.splice(idx, 1);
        btn.style.background = 'var(--color-bg-elevated)';
        btn.style.borderColor = 'var(--border-subtle)';
        btn.style.color = 'var(--color-text-secondary)';
    }
    document.getElementById('butaquesInput').value = selectedSeats.join(',');
    updatePrice();
}

// ── Recalculate price ──
function updatePrice() {
    const sessionId = parseInt(document.getElementById('fk_sesion_id').value);
    const tipusInput = document.querySelector('input[name="tipus_entrada"]:checked');
    const tipus = tipusInput ? tipusInput.value : 'adult';
    const numSeats = selectedSeats.length;

    const sesion = sesionesData[sessionId];
    const preuBase = sesion ? sesion.preu_base : 0;
    const discount = DISCOUNTS[tipus] ?? 1.00;
    const total = Math.round(preuBase * numSeats * discount * 100) / 100;

    // Update summary table
    document.getElementById('summarySeats').textContent = numSeats > 0
        ? selectedSeats.join(', ')
        : '—';
    document.getElementById('summaryBase').textContent = preuBase > 0
        ? preuBase.toFixed(2) + ' €'
        : '—';
    document.getElementById('summaryDiscount').textContent = DISCOUNT_LABELS[tipus] ?? '0%';
    document.getElementById('summaryTotal').textContent = total.toFixed(2).replace('.', ',') + ' €';
    document.getElementById('totalInput').value = total.toFixed(2);

    // Enable/disable submit
    const submitBtn = document.getElementById('submitBtn');
    if (numSeats > 0 && sessionId) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    }
}

// ── Init on old value (form re-render on error) ──
window.addEventListener('DOMContentLoaded', () => {
    const sessionId = document.getElementById('fk_sesion_id').value;
    if (sessionId) {
        buildGrid(parseInt(sessionId));
        // Restore previously selected seats
        const prev = document.getElementById('butaquesInput').value;
        if (prev) {
            prev.split(',').forEach(seatId => {
                seatId = seatId.trim().toUpperCase();
                const btn = document.querySelector(`[data-seat="${seatId}"]`);
                if (btn && !btn.disabled) {
                    selectedSeats.push(seatId);
                    btn.style.background = 'var(--color-accent)';
                    btn.style.borderColor = 'var(--color-accent)';
                    btn.style.color = '#000';
                }
            });
        }
        updatePrice();
    }
});
</script>

<style>
.tipus-card:hover {
    border-color: var(--color-accent) !important;
    background: var(--color-bg-elevated);
}
.tipus-card.selected {
    border-color: var(--color-accent) !important;
    background: color-mix(in srgb, var(--color-accent) 15%, transparent);
}
.tipus-card.selected span:first-of-type + span {
    color: var(--color-accent);
}
</style>
@endsection
