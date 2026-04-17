@extends('layout')
@section('title', '¡Compra completada!')
@section('content')

<div class="max-w-[600px] mx-auto my-16 px-6 text-center">
    <div class="bg-white rounded-2xl px-8 py-12 border border-gray-200">

        {{-- SVG check animado con stroke-dashoffset --}}
        <div class="mx-auto mb-6" style="width:80px;height:80px;">
            <svg viewBox="0 0 80 80" width="80" height="80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(34,197,94,0.15)" stroke-width="4"/>
                <circle cx="40" cy="40" r="36" fill="none" stroke="#22c55e" stroke-width="4"
                        stroke-dasharray="226" stroke-dashoffset="226" stroke-linecap="round"
                        style="transform-origin:center;transform:rotate(-90deg);
                               animation:confirmCircle 0.6s ease forwards 0.1s;"/>
                <path d="M24 40 L35 51 L56 30" fill="none" stroke="#22c55e" stroke-width="4"
                      stroke-linecap="round" stroke-linejoin="round"
                      stroke-dasharray="50" stroke-dashoffset="50"
                      style="animation:confirmCheck 0.4s ease forwards 0.7s;"/>
            </svg>
        </div>
        <style>
        @keyframes confirmCircle { to { stroke-dashoffset: 0; } }
        @keyframes confirmCheck  { to { stroke-dashoffset: 0; } }
        </style>

        <h1 class="text-2xl font-extrabold text-gray-900 mb-2">¡Compra completada!</h1>
        <p class="text-gray-600 text-[0.92rem] mb-8 leading-relaxed">
            Gracias, <strong>{{ $nom }}</strong>. Tu reserva ha sido confirmada.<br>
            En breve recibirás las entradas en tu correo: <strong>{{ $email }}</strong>
        </p>

        <div class="bg-gray-50 rounded-xl p-6 text-left mb-8">
            <div class="text-[0.95rem] font-extrabold mb-4 text-gray-900 border-b border-gray-200 pb-2">
                Detalles de la reserva #{{ $reserva->id }}
            </div>
            <table class="w-full text-[0.88rem] border-collapse">
                <tr><td class="text-gray-500 py-1 px-1 w-[110px]">Película:</td><td class="font-semibold text-gray-900">{{ $reserva->sesion->pelicula->titulo }}</td></tr>
                <tr><td class="text-gray-500 py-1 px-1">Cine:</td><td class="text-gray-900">{{ $reserva->sesion->sala->cine->nombre }}</td></tr>
                <tr><td class="text-gray-500 py-1 px-1">Sala:</td><td class="text-gray-900">{{ $reserva->sesion->sala->nombre }}</td></tr>
                <tr><td class="text-gray-500 py-1 px-1">Fecha:</td><td class="text-gray-900">{{ $reserva->sesion->fecha_hora->locale('es')->isoFormat('dddd D [de] MMMM [de] YYYY') }}</td></tr>
                <tr><td class="text-gray-500 py-1 px-1">Función:</td><td class="text-gray-900">{{ $reserva->sesion->fecha_hora->format('H:i') }}</td></tr>
                <tr><td class="text-gray-500 py-1 px-1">Butacas:</td><td class="font-semibold text-green-600">{{ implode(', ', $butaques) }}</td></tr>
                <tr><td class="text-gray-500 py-1 px-1">Total:</td><td class="font-bold text-base text-gray-900">{{ number_format($total, 2, ',', '') }} €</td></tr>
            </table>
        </div>

        {{-- QR placeholder prominente --}}
        <div class="mx-auto mb-6" style="width:110px;">
            <div class="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center
                        justify-center py-4 px-3">
                <i class="fas fa-qrcode text-5xl text-gray-200 mb-1"></i>
                <span class="text-[0.6rem] text-gray-400 tracking-wide uppercase">QR al correu</span>
            </div>
        </div>

        <p class="text-xs text-gray-400 mb-8 leading-relaxed">
            Las entradas con código QR se enviarán a tu correo en los próximos minutos.<br>
            Revisa la carpeta de spam si no las encuentras.
        </p>

        <div class="flex gap-4 justify-center flex-wrap">
            <a href="{{ route('peliculas.index') }}"
                class="bg-[#1e3a5f] text-white no-underline rounded-full px-8 py-3 text-[0.9rem] font-bold hover:bg-[#152a45] transition-colors">
                Volver a Cartelera
            </a>
            @auth
            <a href="{{ route('reservas.mis') }}"
                class="bg-gray-100 text-gray-700 no-underline rounded-full px-8 py-3 text-[0.9rem] font-bold border border-gray-200 hover:bg-gray-200 transition-colors">
                Mis reservas
            </a>
            @endauth
        </div>
    </div>
</div>
@endsection
