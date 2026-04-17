@extends('layout')
@section('title', 'Compra – Paso 3: Pago')
@section('content')

@include('compra._progress', ['step' => 3])

{{-- ══════════════════════════════════════════════════════════════════════════
     CSS DE LA TARJETA 3D — NO MODIFICAR
     Contiene perspectiva 3D, flip animation, gradientes del chip y la tarjeta.
     Todo el efecto visual de preview en tiempo real depende de estas clases.
     ══════════════════════════════════════════════════════════════════════════ --}}
<style>
/* ── Tarjeta 3D ──────────────────────────────────────────────────────────── */
.card-scene {
    width: 340px; height: 195px;
    perspective: 1000px;
    margin: 0 auto 1.75rem;
}
.card-3d {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(.4,0,.2,1);
}
.card-3d.flipped { transform: rotateY(180deg); }
.card-face {
    position: absolute; inset: 0;
    border-radius: 16px;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    box-shadow: 0 22px 56px rgba(0,0,0,.38);
}
.card-front {
    background: linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 55%, #1a3050 100%);
    padding: 1.25rem 1.4rem;
    color: #fff;
    display: flex; flex-direction: column; justify-content: space-between;
}
.card-back {
    background: linear-gradient(135deg, #14213d 0%, #1a2a4a 100%);
    transform: rotateY(180deg);
    border-radius: 16px;
    overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
}
.card-stripe { background: #111; height: 46px; margin-top: 36px; }
.card-cvv-area {
    background: #f3f4f6; margin: 0.75rem 1.25rem;
    border-radius: 4px; padding: 0.35rem 0.75rem;
    display: flex; justify-content: flex-end; align-items: center; gap: 0.5rem;
}
.card-chip {
    width: 40px; height: 28px;
    background: linear-gradient(135deg, #d4a843, #f7e08a, #c49020);
    border-radius: 4px;
    position: relative;
}
.card-chip::before {
    content: '';
    position: absolute; inset: 4px 5px;
    background: linear-gradient(160deg, #e8c255, #f5df90);
    border-radius: 2px;
    border: 0.5px solid rgba(0,0,0,.15);
}
.card-chip::after {
    content: '';
    position: absolute; top: 50%; left: 0; right: 0;
    height: 1px; background: rgba(0,0,0,.15);
}
.card-num-display {
    font-family: 'Courier New', monospace;
    font-size: 1.25rem; letter-spacing: 4px;
    text-align: center; text-shadow: 0 1px 4px rgba(0,0,0,.4);
}
.card-info-row { display: flex; justify-content: space-between; align-items: flex-end; }
.card-info-item span.lbl { font-size: 0.52rem; opacity: 0.65; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 2px; }
.card-info-item span.val { font-size: 0.82rem; letter-spacing: 1px; }
/* ── Método de pago ──────────────────────────────────────────────────────── */
.method-btn {
    flex: 1; padding: 0.85rem 0.5rem;
    border: 2px solid #e5e7eb; border-radius: 12px;
    background: #fff; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; gap: 0.35rem;
    font: 500 0.82rem/1.3 inherit; color: #374151;
    transition: border-color .2s, box-shadow .2s, background .2s;
}
.method-btn:hover { border-color: #9ca3af; box-shadow: 0 3px 10px rgba(0,0,0,.08); }
.method-btn.active { border-color: #1e3a5f; background: #eef4fb; box-shadow: 0 3px 14px rgba(30,58,95,.18); }
/* ── Inputs ──────────────────────────────────────────────────────────────── */
.pay-input {
    width: 100%; border: 1.5px solid #e0e0e0; border-radius: 9px;
    padding: 0.65rem 0.9rem; font: 0.95rem/1 inherit; outline: none;
    transition: border-color .2s, box-shadow .2s; background: #fafafa;
    box-sizing: border-box;
}
.pay-input:focus { border-color: #1e3a5f; box-shadow: 0 0 0 3px rgba(30,58,95,.1); background: #fff; }
.pay-label { font: 500 0.75rem/1 inherit; color: #6b7280; display: block; margin-bottom: 0.38rem; }
.pay-field { margin-bottom: 1rem; }
/* ── Tarjeta guardada ────────────────────────────────────────────────────── */
.saved-option {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.8rem 1rem; border-radius: 10px; cursor: pointer;
    border: 1.5px solid #e5e7eb;
    transition: border-color .15s, background .15s;
    margin-bottom: 0.5rem;
}
.saved-option:has(input:checked) { border-color: #1e3a5f; background: #eef4fb; }
</style>

<div class="grid gap-8 items-start max-w-5xl mx-auto my-10 px-6 lg:grid-cols-[minmax(0,1fr)_340px]">

    {{-- ── COLUMNA PRINCIPAL ─────────────────────────────────────────────── --}}
    <div class="bg-white rounded-xl p-8 shadow-sm">

        @if(session('error'))
            <div class="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                <i class="fas fa-exclamation-circle mr-1.5"></i>{{ session('error') }}
            </div>
        @endif

        <form method="POST" action="{{ route('compra.step3.store') }}" id="payForm">
            @csrf

            {{-- ── DATOS PERSONALES ──────────────────────────────────────── --}}
            <h2 class="text-[#1e3a5f] text-base font-bold mb-5 pb-2 border-b-2 border-gray-100
                        flex items-center gap-2">
                <i class="fas fa-user-circle text-red-600"></i> Información personal
            </h2>

            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="pay-label">Nombre(s) <span class="text-red-600">*</span></label>
                    <input type="text" name="nom" class="pay-input"
                        value="{{ old('nom', $user?->name ?? '') }}" placeholder="Tu nombre" required>
                    @error('nom')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
                <div>
                    <label class="pay-label">Apellidos</label>
                    <input type="text" name="cognoms" class="pay-input"
                        value="{{ old('cognoms', $user?->apellidos ?? '') }}" placeholder="Tus apellidos">
                </div>
            </div>

            <div class="mb-8">
                <label class="pay-label">Correo electrónico <span class="text-red-600">*</span></label>
                <input type="email" name="email" class="pay-input"
                    value="{{ old('email', $user?->email ?? '') }}" placeholder="correo@ejemplo.com" required>
                @error('email')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            {{-- ── MÉTODO DE PAGO ─────────────────────────────────────────── --}}
            <h2 class="text-[#1e3a5f] text-base font-bold mb-5 pb-2 border-b-2 border-gray-100
                        flex items-center gap-2">
                <i class="fas fa-credit-card text-red-600"></i> Método de pago
            </h2>

            <input type="hidden" name="metode" id="metodeInput" value="{{ old('metode') }}">
            @error('metode')<p class="text-red-600 text-sm mb-4 text-center">{{ $message }}</p>@enderror

            <div class="flex gap-4 mb-6">
                <button type="button" class="method-btn {{ old('metode') === 'bizum' ? 'active' : '' }}"
                    id="btnBizum" onclick="selectMethod('bizum')">
                    <span class="text-2xl leading-none">
                        <svg viewBox="0 0 56 22" width="56" height="22" xmlns="http://www.w3.org/2000/svg">
                            <rect width="56" height="22" rx="4" fill="#1e3a5f"/>
                            <text x="28" y="16" font-size="12" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial,sans-serif">BIZUM</text>
                        </svg>
                    </span>
                    <span class="font-semibold">Bizum</span>
                    <span class="text-[0.7rem] text-gray-400">Pago instantáneo</span>
                </button>
                <button type="button" class="method-btn {{ old('metode') === 'targeta' ? 'active' : '' }}"
                    id="btnTargeta" onclick="selectMethod('targeta')">
                    <span class="text-[1.6rem] leading-none">💳</span>
                    <span class="font-semibold">Tarjeta</span>
                    <span class="text-[0.7rem] text-gray-400">Crédito o débito</span>
                </button>
            </div>

            {{-- ── PANEL BIZUM ─────────────────────────────────────────────── --}}
            <div id="panelBizum" class="{{ old('metode') === 'bizum' ? '' : 'hidden' }}">
                <div class="bg-[#eef4fb] border-[1.5px] border-blue-300 rounded-xl p-7 text-center">
                    <svg viewBox="0 0 130 44" width="130" height="44" xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4">
                        <rect width="130" height="44" rx="8" fill="#1e3a5f"/>
                        <text x="65" y="29" font-size="22" text-anchor="middle" fill="white" font-weight="bold" font-family="Arial,sans-serif">BIZUM</text>
                    </svg>
                    <p class="text-sm text-[#1e3a5f] mb-5 leading-relaxed">
                        Introduce tu número de teléfono asociado a Bizum.<br>Recibirás una notificación en tu app bancaria.
                    </p>
                    <div class="max-w-[300px] mx-auto text-left">
                        <label class="pay-label">Número de teléfono</label>
                        <div class="flex gap-2 items-center">
                            <span class="bg-white border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex-shrink-0 whitespace-nowrap">🇪🇸 +34</span>
                            <input type="tel" name="telefon_bizum" class="pay-input" inputmode="numeric"
                                placeholder="612 345 678" maxlength="12"
                                value="{{ old('telefon_bizum', $user?->telefono ?? '') }}"
                                oninput="checkReady()">
                        </div>
                    </div>
                    <p class="text-xs text-[#1e4a7a] mt-4">
                        <i class="fas fa-shield-alt mr-1"></i>
                        Pago procesado de forma segura mediante tu entidad bancaria.
                    </p>
                </div>
            </div>

            {{-- ── PANEL TARJETA ──────────────────────────────────────────── --}}
            <div id="panelTargeta" class="{{ old('metode') === 'targeta' ? '' : 'hidden' }}">

                {{-- Tarjetas guardadas (si el usuario tiene una guardada) --}}
                @if($savedCard)
                <div class="mb-5">
                    <p class="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">Tus métodos guardados</p>
                    <label class="saved-option">
                        <input type="radio" name="card_mode" value="saved" onchange="toggleCardMode('saved')"
                            class="accent-[#1e3a5f] w-4 h-4"
                            {{ old('card_mode', 'saved') === 'saved' ? 'checked' : '' }}>
                        <span class="text-xl">💳</span>
                        <div class="flex-1">
                            <div class="font-semibold text-sm">{{ $savedCard }}</div>
                            <div class="text-xs text-gray-400">Tarjeta guardada•••</div>
                        </div>
                        <span class="bg-[#1e3a5f] text-white rounded-md px-2 py-0.5 text-xs font-bold">Usar</span>
                    </label>
                    <label class="saved-option">
                        <input type="radio" name="card_mode" value="new" onchange="toggleCardMode('new')"
                            class="accent-[#1e3a5f] w-4 h-4"
                            {{ old('card_mode') === 'new' ? 'checked' : '' }}>
                        <span class="text-lg">➕</span>
                        <div>
                            <div class="font-semibold text-sm">Usar otra tarjeta</div>
                            <div class="text-xs text-gray-400">Introduce una tarjeta diferente</div>
                        </div>
                    </label>
                    <input type="hidden" name="card_mode" id="cardModeHidden"
                        value="{{ old('card_mode', 'saved') }}">
                </div>
                @endif

                {{-- Formulario de nueva tarjeta con preview 3D --}}
                <div id="newCardForm"
                    class="{{ $savedCard && old('card_mode', 'saved') === 'saved' ? 'hidden' : '' }}">

                    {{-- Preview animada — usa las clases del bloque <style> de arriba --}}
                    <div class="card-scene">
                        <div class="card-3d" id="card3d">
                            <div class="card-face card-front" id="cardFront">
                                <div class="flex justify-between items-center">
                                    <div class="card-chip"></div>
                                    <span id="cardBrandLbl" class="text-[0.7rem] font-bold tracking-[1px] opacity-85">VISA</span>
                                </div>
                                <div class="card-num-display" id="cardNumDisplay">
                                    **** &nbsp;**** &nbsp;**** &nbsp;****
                                </div>
                                <div class="card-info-row">
                                    <div class="card-info-item">
                                        <span class="lbl">Titular</span>
                                        <span class="val" id="cardNameDisplay">NOMBRE APELLIDO</span>
                                    </div>
                                    <div class="card-info-item text-right">
                                        <span class="lbl">Válida hasta</span>
                                        <span class="val" id="cardExpiryDisplay">MM/AA</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-face card-back">
                                <div class="card-stripe"></div>
                                <div class="card-cvv-area">
                                    <span class="text-[0.65rem] text-gray-400 mr-1.5">CVV</span>
                                    <span id="cardCvvDisplay" class="font-mono text-[1.05rem] text-gray-700 tracking-[3px]">•••</span>
                                </div>
                                <p class="text-right text-[0.58rem] text-gray-600 px-5 mt-2 italic">
                                    Cine Lumière S.L. — Simulación de pago
                                </p>
                            </div>
                        </div>
                    </div>

                    {{-- Número de tarjeta --}}
                    <div class="pay-field">
                        <label class="pay-label">Número de tarjeta</label>
                        <div class="relative">
                            <input type="text" name="num_targeta" id="cardNumInput" class="pay-input pr-12 tracking-[2px] font-mono"
                                placeholder="1234  5678  9012  3456"
                                maxlength="19" inputmode="numeric" autocomplete="cc-number"
                                value="{{ old('num_targeta') }}">
                            <span id="cardBrandIcon"
                                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl pointer-events-none">💳</span>
                        </div>
                        @error('num_targeta')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                    </div>

                    {{-- Titular --}}
                    <div class="pay-field">
                        <label class="pay-label">Titular de la tarjeta</label>
                        <input type="text" name="titular_targeta" id="cardNameInput" class="pay-input uppercase"
                            placeholder="Como aparece en la tarjeta"
                            autocomplete="cc-name" value="{{ old('titular_targeta') }}">
                        @error('titular_targeta')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                    </div>

                    {{-- Caducidad y CVV en dos columnas --}}
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="pay-label">Caducidad</label>
                            <input type="text" name="expiry_targeta" id="cardExpiryInput" class="pay-input"
                                placeholder="MM/AA" maxlength="5" inputmode="numeric" autocomplete="cc-exp"
                                value="{{ old('expiry_targeta') }}">
                            @error('expiry_targeta')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label class="pay-label">CVV <span class="text-gray-400 font-normal">(3–4 dígitos)</span></label>
                            <input type="text" name="cvv_targeta" id="cardCvvInput" class="pay-input"
                                placeholder="•••" maxlength="4" inputmode="numeric" autocomplete="cc-csc"
                                value="{{ old('cvv_targeta') }}">
                            @error('cvv_targeta')<p class="text-red-600 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                    </div>

                    {{-- Guardar tarjeta (solo para usuarios autenticados) --}}
                    @auth
                    <div class="flex items-start gap-3 p-3.5 bg-slate-50 border-[1.5px] border-slate-200 rounded-xl mb-2">
                        <input type="checkbox" name="guardar_targeta" id="guardarTargeta" value="1"
                            class="w-[17px] h-[17px] accent-[#1e3a5f] shrink-0 mt-0.5"
                            {{ old('guardar_targeta') ? 'checked' : '' }}>
                        <label for="guardarTargeta" class="cursor-pointer text-sm text-gray-700 leading-relaxed">
                            <strong>Guardar tarjeta</strong> para próximas compras
                            <span class="block text-xs text-gray-400 mt-0.5">
                                <i class="fas fa-lock mr-1"></i>Solo almacenamos los últimos 4 dígitos de forma segura.
                            </span>
                        </label>
                    </div>
                    @endauth

                </div>{{-- /newCardForm --}}

            </div>{{-- /panelTargeta --}}

            {{-- ── TÉRMINOS Y CONDICIONES ─────────────────────────────────── --}}
            <div class="flex items-start gap-3 my-7 p-4 bg-gray-50 border-[1.5px] border-gray-200 rounded-xl">
                <input type="checkbox" id="terms" name="terms" required
                    class="mt-0.5 w-[17px] h-[17px] shrink-0 accent-[#1e3a5f]">
                <label for="terms" class="text-sm text-gray-500 leading-relaxed cursor-pointer">
                    He leído y estoy de acuerdo con la
                    <a href="#" class="text-[#1e3a5f] font-semibold">Política de privacidad</a>
                    y el <a href="#" class="text-[#1e3a5f] font-semibold">Aviso Legal</a>.
                    No se realizarán cambios ni devoluciones una vez finalizada la transacción.
                </label>
            </div>

            {{-- ── BOTÓN PAGAR ────────────────────────────────────────────── --}}
            <button type="submit" id="btnRealitzar"
                class="w-full bg-gray-300 text-white border-none rounded-full py-3.5
                       text-base font-bold tracking-[2px] uppercase cursor-not-allowed
                       transition-all duration-200"
                disabled>
                <i class="fas fa-lock mr-2"></i>PAGAR AHORA
            </button>

            {{-- Iconos de seguridad y métodos de pago aceptados --}}
            <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-4
                        text-xs text-gray-400">
                <span><i class="fas fa-shield-alt mr-1"></i>Pago 100% seguro · SSL</span>
                <span>·</span>
                <i class="fab fa-cc-visa text-lg text-[#1a1f71]"></i>
                <i class="fab fa-cc-mastercard text-lg text-[#eb001b]"></i>
                <i class="fab fa-cc-amex text-lg text-[#007bc1]"></i>
                <span>·</span>
                <span><i class="fab fa-google-pay text-lg mr-1"></i>Google Pay</span>
            </div>

        </form>
    </div>

    {{-- ── SIDEBAR ─────────────────────────────────────────────────────────── --}}
    @include('compra._sidebar', ['sesion' => $sesion, 'step' => 3, 'compra' => $compra])
</div>

<script>
(function () {
    // ── Estado inicial (puede venir de una recarga tras error de validación) ──
    let currentMethod = @json(old('metode'));
    let cardMode      = @json(old('card_mode', 'saved'));   // 'saved' | 'new'
    const hasSaved    = @json((bool) $savedCard);

    // ── Selección del método de pago (Bizum o Tarjeta) ────────────────────
    window.selectMethod = function (val) {
        currentMethod = val;
        document.getElementById('metodeInput').value = val;
        document.getElementById('btnBizum').classList.toggle('active', val === 'bizum');
        document.getElementById('btnTargeta').classList.toggle('active', val === 'targeta');
        document.getElementById('panelBizum').classList.toggle('hidden', val !== 'bizum');
        document.getElementById('panelTargeta').classList.toggle('hidden', val !== 'targeta');
        checkReady();
    };

    // ── Alternar entre tarjeta guardada y formulario de nueva tarjeta ─────
    window.toggleCardMode = function (mode) {
        cardMode = mode;
        const form   = document.getElementById('newCardForm');
        const hidden = document.getElementById('cardModeHidden');
        if (form) form.classList.toggle('hidden', mode !== 'new');
        if (hidden) hidden.value = mode;
        checkReady();
    };

    // ── Preview en tiempo real de la tarjeta bancaria ──────────────────────
    // Gradientes según la red de la tarjeta detectada
    const GRADIENTS = {
        VISA:       'linear-gradient(135deg,#1e3a5f 0%,#2d6a9f 55%,#1a3050 100%)',
        Mastercard: 'linear-gradient(135deg,#8b1a1a 0%,#c0392b 55%,#6b1010 100%)',
        AMEX:       'linear-gradient(135deg,#1a4731 0%,#27ae60 55%,#145a32 100%)',
        default:    'linear-gradient(135deg,#1e3a5f 0%,#2d6a9f 55%,#1a3050 100%)',
    };

    // Detecta la red de la tarjeta a partir de los primeros dígitos
    function detectBrand(digits) {
        if (/^4/.test(digits))               return 'VISA';
        if (/^5[1-5]|^2[2-7]/.test(digits)) return 'Mastercard';
        if (/^3[47]/.test(digits))           return 'AMEX';
        return 'default';
    }
    function brandIcon(brand) {
        return { VISA: '💳', Mastercard: '🔴', AMEX: '💚', default: '💳' }[brand] || '💳';
    }

    const numInput    = document.getElementById('cardNumInput');
    const nameInput   = document.getElementById('cardNameInput');
    const expiryInput = document.getElementById('cardExpiryInput');
    const cvvInput    = document.getElementById('cardCvvInput');

    // Actualiza número y marca de la tarjeta en tiempo real
    numInput?.addEventListener('input', function () {
        const digits = this.value.replace(/\D/g, '').substring(0, 16);
        this.value   = digits.replace(/(.{4})/g, '$1 ').trim();
        const padded = digits.padEnd(16, '*');
        const groups = padded.match(/.{1,4}/g) || [];
        document.getElementById('cardNumDisplay').textContent = groups.join('   ');
        const brand  = detectBrand(digits);
        document.getElementById('cardBrandLbl').textContent  = brand !== 'default' ? brand : 'VISA';
        document.getElementById('cardBrandIcon').textContent = brandIcon(brand);
        const front  = document.getElementById('cardFront');
        if (front) front.style.background = GRADIENTS[brand] || GRADIENTS.default;
        checkReady();
    });

    // Actualiza el nombre del titular en la preview
    nameInput?.addEventListener('input', function () {
        const v = this.value.toUpperCase().substring(0, 22);
        document.getElementById('cardNameDisplay').textContent = v || 'NOMBRE APELLIDO';
        checkReady();
    });

    // Formatea automáticamente MM/AA y actualiza la preview
    expiryInput?.addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').substring(0, 4);
        if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
        this.value = v;
        document.getElementById('cardExpiryDisplay').textContent = v || 'MM/AA';
        checkReady();
    });

    // Al enfocar el CVV, gira la tarjeta para mostrar el reverso (flip 3D)
    cvvInput?.addEventListener('focus',  () => document.getElementById('card3d')?.classList.add('flipped'));
    cvvInput?.addEventListener('blur',   () => document.getElementById('card3d')?.classList.remove('flipped'));
    cvvInput?.addEventListener('input', function () {
        const v = this.value.replace(/\D/g, '');
        document.getElementById('cardCvvDisplay').textContent = v ? '•'.repeat(v.length) : '•••';
        checkReady();
    });

    // ── Valida todos los campos y activa/desactiva el botón de pagar ─────
    window.checkReady = function () {
        const termsOk  = document.getElementById('terms').checked;
        const methodOk = !!currentMethod;
        let paymentOk  = false;

        if (currentMethod === 'bizum') {
            paymentOk = true;
        } else if (currentMethod === 'targeta') {
            if (hasSaved && cardMode === 'saved') {
                paymentOk = true;
            } else {
                const num  = (numInput?.value.replace(/\D/g, '').length  ?? 0) >= 15;
                const name = (nameInput?.value.trim().length              ?? 0) >= 2;
                const exp  = (expiryInput?.value.length                  ?? 0) >= 5;
                const cvv  = (cvvInput?.value.replace(/\D/g, '').length  ?? 0) >= 3;
                paymentOk  = num && name && exp && cvv;
            }
        }

        const ok  = termsOk && methodOk && paymentOk;
        const btn = document.getElementById('btnRealitzar');
        btn.disabled = !ok;

        if (ok) {
            btn.classList.remove('bg-gray-300', 'cursor-not-allowed');
            btn.classList.add('bg-[#1e3a5f]', 'hover:bg-[#152a45]', 'cursor-pointer', 'shadow-[0_6px_20px_rgba(30,58,95,.35)]');
        } else {
            btn.classList.remove('bg-[#1e3a5f]', 'hover:bg-[#152a45]', 'cursor-pointer', 'shadow-[0_6px_20px_rgba(30,58,95,.35)]');
            btn.classList.add('bg-gray-300', 'cursor-not-allowed');
        }
    };

    document.getElementById('terms').addEventListener('change', checkReady);

    // Restaurar estado visual si se recarga la página tras un error de validación
    if (currentMethod) selectMethod(currentMethod);
    if (hasSaved && cardMode !== 'new') toggleCardMode('saved');
})();
</script>
@endsection
