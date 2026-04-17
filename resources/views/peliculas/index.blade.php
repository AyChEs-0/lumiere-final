@extends('layout')

@section('title', 'Cartelera — Cine Lumière')

@section('content')

<div class="container">
    <div style="margin-bottom:2rem;">
        <h1 class="page-title" style="margin-bottom:0.25rem;">EN CARTELLERA</h1>
        <p style="color:var(--color-text-secondary);font-size:0.9rem;">
            Pel·lícules amb sessions disponibles
        </p>
    </div>

    {{-- Filters --}}
    <form method="GET" action="{{ route('peliculas.index') }}"
          style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:2rem;display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-end;">

        <div style="flex:1;min-width:140px;">
            <label class="form-label" style="margin-bottom:0.35rem;">Dia</label>
            <select name="dia" class="form-select">
                <option value="">Tots els dies</option>
                @foreach($filterDates as $dia)
                    <option value="{{ $dia }}" {{ request('dia') == $dia ? 'selected' : '' }}>
                        {{ \Carbon\Carbon::parse($dia)->translatedFormat('D d/m') }}
                    </option>
                @endforeach
            </select>
        </div>

        <div style="flex:1;min-width:140px;">
            <label class="form-label" style="margin-bottom:0.35rem;">Cine</label>
            <select name="cine_id" class="form-select">
                <option value="">Tots els cines</option>
                @foreach($filterCines as $cine)
                    <option value="{{ $cine->id }}" {{ request('cine_id') == $cine->id ? 'selected' : '' }}>
                        {{ $cine->nombre }}
                    </option>
                @endforeach
            </select>
        </div>

        <div style="flex:1;min-width:140px;">
            <label class="form-label" style="margin-bottom:0.35rem;">Gènere</label>
            <select name="categoria_id" class="form-select">
                <option value="">Tots els gèneres</option>
                @foreach($filterCats as $cat)
                    <option value="{{ $cat->id }}" {{ request('categoria_id') == $cat->id ? 'selected' : '' }}>
                        {{ $cat->nombre }}
                    </option>
                @endforeach
            </select>
        </div>

        <div style="display:flex;gap:0.5rem;align-items:flex-end;">
            <button type="submit" class="btn btn-primary btn-sm">
                <i class="fas fa-filter mr-1"></i>Filtrar
            </button>
            @if($filtered)
                <a href="{{ route('peliculas.index') }}" class="btn btn-secondary btn-sm">
                    <i class="fas fa-times mr-1"></i>Netejar
                </a>
            @endif
        </div>
    </form>

    {{-- Movie Grid --}}
    @if($peliculas->isEmpty())
        <div style="text-align:center;padding:4rem 2rem;">
            <i class="fas fa-film" style="font-size:3rem;color:var(--color-text-secondary);margin-bottom:1rem;display:block;"></i>
            <p style="color:var(--color-text-secondary);font-size:1.1rem;">
                {{ $filtered ? 'Cap pel·lícula coincideix amb els filtres seleccionats.' : 'No hi ha pel·lícules en cartellera en aquest moment.' }}
            </p>
            @if($filtered)
                <a href="{{ route('peliculas.index') }}" class="btn btn-secondary" style="margin-top:1.5rem;">
                    Veure tota la cartelera
                </a>
            @endif
        </div>
    @else
        <div class="movies-grid">
            @foreach($peliculas as $pelicula)
                <article class="card-movie">
                    <img src="{{ $pelicula->poster_url }}"
                         alt="Poster de {{ $pelicula->titulo }}"
                         loading="lazy"
                         onerror="this.src='{{ $pelicula->getPosterPlaceholder() }}'">

                    {{-- Hover overlay --}}
                    <div class="card-movie-overlay">
                        <div style="text-align:center;padding:1.5rem;">
                            <p style="font-weight:700;font-size:0.9rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">
                                {{ $pelicula->titulo }}
                            </p>
                            @if($pelicula->categorias->first())
                                <p style="color:var(--color-accent-bright);font-size:0.75rem;font-weight:700;text-transform:uppercase;margin-bottom:1rem;">
                                    {{ $pelicula->categorias->pluck('nombre')->join(' · ') }}
                                </p>
                            @endif

                            {{-- Next sessions --}}
                            @if($pelicula->proximesSessions->isNotEmpty())
                                <div style="margin-bottom:1rem;">
                                    @foreach($pelicula->proximesSessions->take(3) as $sessio)
                                        <a href="{{ route('compra.step1') }}?sesion_id={{ $sessio->id }}"
                                           style="display:inline-block;background:rgba(212,24,61,0.2);border:1px solid rgba(212,24,61,0.4);color:white;font-size:0.7rem;font-weight:700;padding:0.25rem 0.6rem;border-radius:4px;text-decoration:none;margin:0.15rem;">
                                            {{ $sessio->fecha_hora->format('H:i') }}
                                        </a>
                                    @endforeach
                                </div>
                            @endif

                            <a href="{{ route('peliculas.show', $pelicula) }}"
                               class="btn btn-primary btn-sm" style="width:100%;">
                                Veure Horaris
                            </a>
                        </div>
                    </div>

                    {{-- Genre badge --}}
                    @if($pelicula->categorias->first())
                        <div class="card-movie-badge">{{ $pelicula->categorias->first()->nombre }}</div>
                    @endif

                    {{-- Duration badge --}}
                    @if($pelicula->duracion_min)
                        <div class="card-movie-duration">
                            {{ $pelicula->duracion_min }} min · {{ $pelicula->classificacio_edad ?? 'TP' }}
                        </div>
                    @endif

                    {{-- Title + next session --}}
                    <div style="position:absolute;bottom:0;left:0;right:0;padding:1rem;
                                background:linear-gradient(to top,rgba(0,0,0,0.95),transparent);">
                        <p style="font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;
                                   white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:0.25rem;">
                            {{ $pelicula->titulo }}
                        </p>
                        @if($pelicula->proximesSessions->first())
                            <p style="color:var(--color-accent-bright);font-size:0.72rem;font-weight:700;">
                                <i class="fas fa-clock mr-1"></i>
                                Propera: {{ $pelicula->proximesSessions->first()->fecha_hora->translatedFormat('D d/m H:i') }}
                            </p>
                        @endif
                    </div>
                </article>
            @endforeach
        </div>
    @endif
</div>

@endsection
