@extends('layout')

@section('title', $pelicula->titulo . ' — Cine Lumière')

@section('content')

<div class="container">

    {{-- Back --}}
    <div style="margin-bottom:1.5rem;">
        <a href="{{ route('peliculas.index') }}"
           style="color:var(--color-text-secondary);text-decoration:none;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">
            <i class="fas fa-arrow-left mr-2"></i>Cartelera
        </a>
    </div>

    {{-- Movie detail --}}
    <div style="display:grid;grid-template-columns:280px 1fr;gap:3rem;align-items:start;margin-bottom:3rem;">

        {{-- Poster --}}
        <div style="position:sticky;top:100px;">
            <img src="{{ $pelicula->poster_url }}"
                 alt="Poster de {{ $pelicula->titulo }}"
                 style="width:100%;border-radius:12px;border:1px solid var(--border-subtle);box-shadow:0 8px 40px rgba(0,0,0,0.5);">
        </div>

        {{-- Info --}}
        <div>
            {{-- Genres --}}
            @if($pelicula->categorias->isNotEmpty())
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
                    @foreach($pelicula->categorias as $cat)
                        <span style="background:rgba(212,24,61,0.15);border:1px solid rgba(212,24,61,0.35);
                                     color:var(--color-accent-bright);font-size:0.7rem;font-weight:700;
                                     text-transform:uppercase;letter-spacing:0.1em;padding:0.25rem 0.75rem;border-radius:9999px;">
                            {{ $cat->nombre }}
                        </span>
                    @endforeach
                </div>
            @endif

            <h1 style="font-size:2.5rem;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;
                        margin-bottom:1rem;line-height:1.1;">
                {{ $pelicula->titulo }}
            </h1>

            {{-- Meta --}}
            <div style="display:flex;flex-wrap:wrap;gap:1.5rem;margin-bottom:1.5rem;color:var(--color-text-secondary);font-size:0.85rem;">
                @if($pelicula->duracion_min)
                    <span><i class="fas fa-clock mr-1"></i>{{ $pelicula->duracion_min }} min</span>
                @endif
                @if($pelicula->classificacio_edad)
                    <span style="background:rgba(255,255,255,0.1);border:1px solid var(--border-subtle);
                                 padding:0.15rem 0.5rem;border-radius:4px;font-weight:700;">
                        {{ $pelicula->classificacio_edad }}
                    </span>
                @endif
            </div>

            {{-- Synopsis --}}
            @if($pelicula->sinopsis)
                <div style="margin-bottom:2rem;">
                    <h3 style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;
                                color:var(--color-text-secondary);margin-bottom:0.75rem;">Sinopsi</h3>
                    <p style="color:var(--color-text-secondary);line-height:1.75;font-size:0.95rem;">
                        {{ $pelicula->sinopsis }}
                    </p>
                </div>
            @endif

            {{-- Trailer --}}
            @if($pelicula->trailer_url)
                <a href="{{ $pelicula->trailer_url }}" target="_blank" rel="noopener"
                   class="btn btn-secondary btn-sm" style="margin-bottom:2rem;">
                    <i class="fas fa-play mr-2"></i>Veure Tràiler
                </a>
            @endif

            {{-- Sessions --}}
            <div>
                <h2 style="font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;
                            margin-bottom:1.25rem;color:var(--color-text-primary);">
                    Sessions Disponibles
                </h2>

                @forelse($pelicula->sesiones->groupBy(fn($s) => $s->fecha_hora->format('Y-m-d')) as $dia => $sessions)
                    <div style="margin-bottom:1.5rem;">
                        <p style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;
                                   color:var(--color-text-secondary);margin-bottom:0.75rem;">
                            {{ \Carbon\Carbon::parse($dia)->translatedFormat('l, d F Y') }}
                        </p>
                        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
                            @foreach($sessions as $sessio)
                                <a href="{{ route('compra.step1') }}?sesion_id={{ $sessio->id }}"
                                   style="display:flex;flex-direction:column;align-items:center;
                                          background:var(--color-bg-secondary);border:1px solid var(--border-subtle);
                                          border-radius:8px;padding:0.75rem 1.25rem;text-decoration:none;
                                          transition:border-color 0.2s,background 0.2s;min-width:90px;"
                                   onmouseover="this.style.borderColor='var(--color-accent-bright)';this.style.background='rgba(212,24,61,0.1)'"
                                   onmouseout="this.style.borderColor='var(--border-subtle)';this.style.background='var(--color-bg-secondary)'">
                                    <span style="font-size:1.1rem;font-weight:800;color:var(--color-text-primary);">
                                        {{ $sessio->fecha_hora->format('H:i') }}
                                    </span>
                                    <span style="font-size:0.7rem;color:var(--color-text-secondary);margin-top:0.15rem;">
                                        {{ $sessio->sala->cine->ciudad ?? $sessio->sala->nombre }}
                                    </span>
                                    <span style="font-size:0.7rem;color:var(--color-accent-bright);font-weight:700;margin-top:0.15rem;">
                                        {{ number_format($sessio->preu_base, 2) }} €
                                    </span>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @empty
                    <p style="color:var(--color-text-secondary);">
                        No hi ha sessions disponibles per a aquesta pel·lícula.
                    </p>
                @endforelse
            </div>
        </div>
    </div>

</div>

@endsection
