<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Cine Lumière')</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;900&display=swap" rel="stylesheet">

    @stack('styles')
</head>
<body>

<!-- ── Top Bar ───────────────────────────────────────────────────────────── -->
<div class="top-bar">
    <div class="top-bar-container">
        <div class="top-bar-links">
            <a href="{{ route('cines.index') }}">
                <i class="fas fa-map-marker-alt mr-1"></i>Els Nostres Cines
            </a>
            @auth
                <a href="{{ route('reservas.mis') }}">
                    <i class="fas fa-ticket-alt mr-1"></i>Les Meves Reserves
                </a>
            @endauth
        </div>
        <div class="social-icons">
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter/X"><i class="fab fa-x-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        </div>
    </div>
</div>

<!-- ── Header ────────────────────────────────────────────────────────────── -->
<header class="header-premium">
    <div class="header-container">
        <a href="{{ route('home') }}" class="logo" style="text-decoration:none;">
            <span class="logo-cine">CINE</span>
            <span class="logo-lumiere">&nbsp;LUMIÈRE</span>
        </a>

        <nav class="nav-main" id="navMain">
            <a href="{{ route('peliculas.index') }}"
               class="nav-link {{ request()->routeIs('peliculas.index') ? 'active' : '' }}">
                Cartelera
            </a>
            <a href="{{ route('cines.index') }}"
               class="nav-link {{ request()->routeIs('cines.*') ? 'active' : '' }}">
                Cines
            </a>
            @auth
                @if(auth()->user()->canManage())
                    <a href="{{ route('dashboard') }}"
                       class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                        Gestió
                    </a>
                @else
                    <a href="{{ route('reservas.mis') }}"
                       class="nav-link {{ request()->routeIs('reservas.mis') ? 'active' : '' }}">
                        Les Meves Reserves
                    </a>
                @endif
            @endauth
        </nav>

        <div style="display:flex;align-items:center;gap:1rem;">
            @auth
                <div style="position:relative;" x-data="{ open: false }">
                    <button @click="open = !open"
                            style="background:none;border:1px solid var(--border-subtle);color:var(--color-text-primary);padding:0.5rem 1.25rem;border-radius:9999px;cursor:pointer;font-size:0.85rem;font-weight:700;display:flex;align-items:center;gap:0.5rem;">
                        <i class="fas fa-user-circle"></i>
                        {{ auth()->user()->name }}
                        <i class="fas fa-chevron-down" style="font-size:0.7rem;"></i>
                    </button>

                    <div x-show="open" @click.away="open = false"
                         style="position:absolute;right:0;top:calc(100% + 0.5rem);background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:8px;min-width:180px;z-index:999;padding:0.5rem 0;">
                        <a href="{{ route('profile.edit') }}"
                           style="display:block;padding:0.6rem 1rem;font-size:0.85rem;color:var(--color-text-primary);text-decoration:none;hover:background:rgba(255,255,255,0.05)">
                            <i class="fas fa-user mr-2"></i>Perfil
                        </a>
                        @if(auth()->user()->canManage())
                            <a href="{{ route('dashboard') }}"
                               style="display:block;padding:0.6rem 1rem;font-size:0.85rem;color:var(--color-text-primary);text-decoration:none;">
                                <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
                            </a>
                        @else
                            <a href="{{ route('reservas.mis') }}"
                               style="display:block;padding:0.6rem 1rem;font-size:0.85rem;color:var(--color-text-primary);text-decoration:none;">
                                <i class="fas fa-ticket-alt mr-2"></i>Les Meves Reserves
                            </a>
                        @endif
                        <div style="border-top:1px solid var(--border-subtle);margin:0.25rem 0;"></div>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit"
                                    style="width:100%;background:none;border:none;text-align:left;padding:0.6rem 1rem;font-size:0.85rem;color:#e74c3c;cursor:pointer;">
                                <i class="fas fa-sign-out-alt mr-2"></i>Sortir
                            </button>
                        </form>
                    </div>
                </div>
            @else
                <a href="{{ route('login') }}" class="btn btn-secondary btn-sm">Entrar</a>
                <a href="{{ route('register') }}" class="btn btn-primary btn-sm">Registrar-se</a>
            @endguest
        </div>

        <button class="mobile-menu-toggle" onclick="document.getElementById('navMain').classList.toggle('open')" aria-label="Menu">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</header>

<!-- ── Flash messages ────────────────────────────────────────────────────── -->
@if(session('success'))
    <div class="container" style="padding-bottom:0;">
        <div class="alert alert-success">{{ session('success') }}</div>
    </div>
@endif
@if(session('error'))
    <div class="container" style="padding-bottom:0;">
        <div class="alert alert-error">{{ session('error') }}</div>
    </div>
@endif
@if(session('status'))
    <div class="container" style="padding-bottom:0;">
        <div class="alert alert-info">{{ session('status') }}</div>
    </div>
@endif

<!-- ── Content ────────────────────────────────────────────────────────────── -->
<main>
    @yield('content')
</main>

<!-- ── Footer ────────────────────────────────────────────────────────────── -->
<footer style="background:var(--color-bg-secondary);border-top:1px solid var(--border-subtle);margin-top:4rem;padding:3rem 0;">
    <div class="container" style="padding-top:0;padding-bottom:0;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;margin-bottom:2rem;">
            <div>
                <div class="logo" style="margin-bottom:1rem;">
                    <span class="logo-cine" style="font-size:1.5rem;">CINE</span>
                    <span class="logo-lumiere" style="font-size:1.5rem;">&nbsp;LUMIÈRE</span>
                </div>
                <p style="color:var(--color-text-secondary);font-size:0.85rem;line-height:1.6;">
                    Cinema premium amb la millor selecció de pel·lícules.
                </p>
            </div>
            <div>
                <p style="font-weight:700;text-transform:uppercase;letter-spacing:1px;font-size:0.75rem;color:var(--color-text-secondary);margin-bottom:1rem;">Navegació</p>
                <ul style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;">
                    <li><a href="{{ route('peliculas.index') }}" style="color:var(--color-text-primary);text-decoration:none;font-size:0.875rem;">Cartelera</a></li>
                    <li><a href="{{ route('cines.index') }}" style="color:var(--color-text-primary);text-decoration:none;font-size:0.875rem;">Cines</a></li>
                    @auth
                        <li><a href="{{ route('reservas.mis') }}" style="color:var(--color-text-primary);text-decoration:none;font-size:0.875rem;">Les Meves Reserves</a></li>
                    @else
                        <li><a href="{{ route('login') }}" style="color:var(--color-text-primary);text-decoration:none;font-size:0.875rem;">Accedir</a></li>
                    @endauth
                </ul>
            </div>
        </div>
        <div style="border-top:1px solid var(--border-subtle);padding-top:1.5rem;text-align:center;">
            <p style="color:var(--color-text-secondary);font-size:0.8rem;">
                &copy; {{ date('Y') }} Cine Lumière. Tots els drets reservats.
            </p>
        </div>
    </div>
</footer>

@stack('scripts')
</body>
</html>
