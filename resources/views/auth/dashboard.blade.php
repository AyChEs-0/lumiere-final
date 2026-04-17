@extends('layout')

@section('title', 'Dashboard')

@section('content')
@php
    $user = Auth::user();
    $isAdmin   = $user->isAdmin();
    $isManager = $isAdmin || $user->isTaquilla();

    if ($isManager) {
        $statPeliculas = \App\Models\Pelicula::count();
        $statSesiones  = \App\Models\Sesion::where('fecha_hora', '>=', now())->count();
        $statCines     = \App\Models\Cine::distinct('nombre')->count('nombre');
        $statReservas  = \App\Models\Reserva::count();
        $statUsuarios  = $isAdmin ? \App\Models\User::count() : null;
        $proximasSesiones = \App\Models\Sesion::with(['pelicula','sala.cine'])
            ->where('fecha_hora', '>=', now())
            ->orderBy('fecha_hora')
            ->take(8)
            ->get();
        $ultimasReservas = \App\Models\Reserva::with(['sesion.pelicula','user'])
            ->latest()
            ->take(6)
            ->get();
    }
@endphp

<div style="padding-top:2rem;padding-bottom:4rem;max-width:1400px;margin:0 auto;padding-left:1.5rem;padding-right:1.5rem;">

    @if (session('success'))
        <div class="alert alert-success" style="margin-bottom:1.5rem;">{{ session('success') }}</div>
    @endif

    {{-- ───── CLIENTE ───── --}}
    @if(!$isManager)
    <div style="max-width:600px;margin:4rem auto;text-align:center;">
        <h1 class="page-title" style="margin-bottom:0.5rem;">BENVINGUT, {{ strtoupper($user->name) }}</h1>
        <p style="color:var(--color-text-secondary);margin-bottom:2rem;">El teu espai personal de Lumière</p>
        <a href="{{ route('cliente.dashboard') }}" class="btn btn-primary" style="padding:0.75rem 2.5rem;font-size:1rem;">
            El meu tauler &rarr;
        </a>
    </div>
    @else
    {{-- ───── ADMIN / TAQUILLA ───── --}}

    {{-- Header --}}
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2.5rem;flex-wrap:wrap;gap:1rem;">
        <div>
            <p style="color:var(--color-text-secondary);font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;margin:0 0 0.25rem;">PANELL D'ADMINISTRACIÓ</p>
            <h1 style="font-size:1.75rem;font-weight:900;margin:0;letter-spacing:-0.5px;">
                Benvingut, {{ $user->name }}
                <span style="background:var(--color-accent-bright)22;color:var(--color-accent-bright);border:1px solid var(--color-accent-bright)44;padding:2px 10px;border-radius:20px;font-size:0.7rem;font-weight:700;letter-spacing:2px;vertical-align:middle;margin-left:0.5rem;">{{ strtoupper($user->rol) }}</span>
            </h1>
        </div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
            <a href="{{ route('sesiones.create') }}" class="btn btn-primary" style="padding:0.5rem 1.25rem;font-size:0.85rem;">
                <i class="fas fa-plus" style="margin-right:6px;"></i>Nova Sessió
            </a>
            @if($isAdmin)
            <a href="{{ route('peliculas.create') }}" class="btn btn-secondary" style="padding:0.5rem 1.25rem;font-size:0.85rem;">
                <i class="fas fa-film" style="margin-right:6px;"></i>Nova Pel·lícula
            </a>
            <a href="{{ route('cines.create') }}" class="btn btn-secondary" style="padding:0.5rem 1.25rem;font-size:0.85rem;">
                <i class="fas fa-building" style="margin-right:6px;"></i>Nou Cine
            </a>
            @endif
        </div>
    </div>

    {{-- Stats cards --}}
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin-bottom:2.5rem;">
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;">
            <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 0.5rem;">Pel·lícules</p>
            <p style="font-size:2rem;font-weight:900;margin:0;color:var(--color-accent-bright);">{{ $statPeliculas }}</p>
        </div>
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;">
            <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 0.5rem;">Sessions futures</p>
            <p style="font-size:2rem;font-weight:900;margin:0;color:#27ae60;">{{ $statSesiones }}</p>
        </div>
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;">
            <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 0.5rem;">Cines</p>
            <p style="font-size:2rem;font-weight:900;margin:0;">{{ $statCines }}</p>
        </div>
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;">
            <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 0.5rem;">Reserves totals</p>
            <p style="font-size:2rem;font-weight:900;margin:0;">{{ $statReservas }}</p>
        </div>
        @if($isAdmin)
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;">
            <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 0.5rem;">Usuaris</p>
            <p style="font-size:2rem;font-weight:900;margin:0;">{{ $statUsuarios }}</p>
        </div>
        @endif
    </div>

    {{-- Two-column grid --}}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;">

        {{-- ── Properes sessions ── --}}
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;overflow:hidden;">
            <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:space-between;">
                <span style="font-weight:800;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase;">Properes Sessions</span>
                <a href="{{ route('sesiones.create') }}" style="color:var(--color-accent-bright);font-size:0.75rem;text-decoration:none;font-weight:600;">+ Afegir</a>
            </div>
            <div style="overflow-x:auto;">
                <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                    <thead>
                        <tr style="border-bottom:1px solid var(--border-subtle);">
                            <th style="padding:0.6rem 1rem;text-align:left;color:var(--color-text-secondary);font-weight:600;font-size:0.7rem;letter-spacing:1px;text-transform:uppercase;">Pel·lícula</th>
                            <th style="padding:0.6rem 1rem;text-align:left;color:var(--color-text-secondary);font-weight:600;font-size:0.7rem;letter-spacing:1px;text-transform:uppercase;">Data</th>
                            <th style="padding:0.6rem 1rem;text-align:left;color:var(--color-text-secondary);font-weight:600;font-size:0.7rem;letter-spacing:1px;text-transform:uppercase;">Sala / Cine</th>
                            <th style="padding:0.6rem 0.75rem;text-align:right;color:var(--color-text-secondary);font-weight:600;font-size:0.7rem;letter-spacing:1px;text-transform:uppercase;">€</th>
                            <th style="padding:0.6rem 1rem;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($proximasSesiones as $s)
                        <tr style="border-bottom:1px solid var(--border-subtle)22;transition:background 0.15s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background=''">
                            <td style="padding:0.65rem 1rem;font-weight:600;white-space:nowrap;max-width:150px;overflow:hidden;text-overflow:ellipsis;">{{ $s->pelicula->titulo ?? '—' }}</td>
                            <td style="padding:0.65rem 1rem;color:var(--color-text-secondary);white-space:nowrap;">
                                {{ $s->fecha_hora->format('d/m') }}
                                <span style="color:var(--color-accent-bright);font-weight:700;"> {{ $s->fecha_hora->format('H:i') }}</span>
                            </td>
                            <td style="padding:0.65rem 1rem;color:var(--color-text-secondary);font-size:0.78rem;">
                                {{ $s->sala->nombre ?? '—' }}<br>
                                <span style="font-size:0.72rem;opacity:0.6;">{{ $s->sala->cine->ciudad ?? '' }}</span>
                            </td>
                            <td style="padding:0.65rem 0.75rem;text-align:right;font-weight:700;">{{ number_format($s->preu_base, 2) }}</td>
                            <td style="padding:0.65rem 1rem;text-align:right;white-space:nowrap;">
                                <a href="{{ route('sesiones.edit', $s) }}" style="color:var(--color-accent-bright);font-size:0.75rem;text-decoration:none;margin-right:0.5rem;">Editar</a>
                                <form action="{{ route('sesiones.destroy', $s) }}" method="POST" style="display:inline" onsubmit="return confirm('Eliminar?')">
                                    @csrf @method('DELETE')
                                    <button type="submit" style="background:none;border:none;color:#e74c3c;font-size:0.75rem;cursor:pointer;padding:0;">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                        @empty
                        <tr><td colspan="5" style="padding:2rem;text-align:center;color:var(--color-text-secondary);font-size:0.85rem;">No hi ha sessions programades</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            <div style="padding:0.75rem 1.5rem;border-top:1px solid var(--border-subtle)22;">
                <a href="{{ route('sesiones.index') }}" style="color:var(--color-text-secondary);font-size:0.75rem;text-decoration:none;">Veure totes les sessions &rarr;</a>
            </div>
        </div>

        {{-- ── Columna dreta ── --}}
        <div style="display:flex;flex-direction:column;gap:2rem;">

            {{-- Últimes reserves --}}
            <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;overflow:hidden;">
                <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-weight:800;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase;">Últimes Reserves</span>
                    <a href="{{ route('reservas.index') }}" style="color:var(--color-accent-bright);font-size:0.75rem;text-decoration:none;font-weight:600;">Veure totes</a>
                </div>
                <div>
                    @forelse($ultimasReservas as $r)
                    <div style="padding:0.75rem 1.5rem;border-bottom:1px solid var(--border-subtle)22;display:flex;align-items:center;justify-content:space-between;font-size:0.82rem;">
                        <div>
                            <p style="margin:0;font-weight:600;">{{ $r->user->name ?? 'Client' }}</p>
                            <p style="margin:0;color:var(--color-text-secondary);font-size:0.75rem;">{{ $r->sesion->pelicula->titulo ?? '—' }} · {{ $r->sesion->fecha_hora?->format('d/m H:i') ?? '' }}</p>
                        </div>
                        <span style="font-weight:700;color:var(--color-accent-bright);">€{{ number_format($r->total_pagat ?? 0, 2) }}</span>
                    </div>
                    @empty
                    <p style="padding:1.5rem;text-align:center;color:var(--color-text-secondary);font-size:0.85rem;margin:0;">Cap reserva encara</p>
                    @endforelse
                </div>
            </div>

            {{-- Gestió ràpida --}}
            @if($isAdmin)
            <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.5rem;">
                <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 1rem;">GESTIÓ RÀPIDA</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
                    <a href="{{ route('admin.peliculas.index') }}" class="btn btn-secondary" style="text-align:center;padding:0.6rem;font-size:0.8rem;">
                        <i class="fas fa-film" style="display:block;font-size:1.2rem;margin-bottom:4px;"></i>Pel·lícules
                    </a>
                    <a href="{{ route('admin.cines.index') }}" class="btn btn-secondary" style="text-align:center;padding:0.6rem;font-size:0.8rem;">
                        <i class="fas fa-building" style="display:block;font-size:1.2rem;margin-bottom:4px;"></i>Cines
                    </a>
                    <a href="{{ route('salas.index') }}" class="btn btn-secondary" style="text-align:center;padding:0.6rem;font-size:0.8rem;">
                        <i class="fas fa-door-open" style="display:block;font-size:1.2rem;margin-bottom:4px;"></i>Sales
                    </a>
                    <a href="{{ route('usuarios.index') }}" class="btn btn-secondary" style="text-align:center;padding:0.6rem;font-size:0.8rem;">
                        <i class="fas fa-users" style="display:block;font-size:1.2rem;margin-bottom:4px;"></i>Usuaris
                    </a>
                </div>
            </div>
            @endif

            {{-- Info compte --}}
            <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;">
                <p style="font-size:0.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--color-text-secondary);margin:0 0 0.75rem;">COMPTE</p>
                <div style="font-size:0.85rem;display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1rem;">
                    <p style="margin:0;"><strong>{{ $user->name }} {{ $user->apellidos }}</strong></p>
                    <p style="margin:0;color:var(--color-text-secondary);">{{ $user->email }}</p>
                </div>
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    <a href="{{ route('profile.edit') }}" class="btn btn-secondary" style="padding:0.4rem 1rem;font-size:0.8rem;">Editar perfil</a>
                    <form method="POST" action="{{ route('logout') }}" style="display:inline;">
                        @csrf
                        <button type="submit" class="btn" style="background:#e74c3c22;color:#e74c3c;border:1px solid #e74c3c44;padding:0.4rem 1rem;font-size:0.8rem;">Sortir</button>
                    </form>
                </div>
            </div>

        </div>{{-- /right col --}}
    </div>{{-- /grid --}}

    @endif {{-- /isManager --}}
</div>
@endsection

