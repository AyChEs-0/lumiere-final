@extends('layout')

@section('title', 'Cine Lumière — Cinema Premium')

@section('content')

{{-- ======================================================
     Hero Section — Película más popular en taquilla española
     Si $tmdbHero tiene datos (película no en BD local),
     mostramos su poster como fondo y su info.
     ====================================================== --}}
@php
    $heroTitle    = $destacada?->titulo    ?? ($tmdbHero['title']       ?? 'CINEMA PREMIUM');
    $heroSynopsis = $destacada?->sinopsis  ?? ($tmdbHero['description'] ?? "Viu l'experiència única del cinema");
    $heroPoster   = $destacada?->poster_url ?? ($tmdbHero['image_url']  ?? '');
    $heroLink     = $destacada ? route('peliculas.show', $destacada) : route('peliculas.index');
    $heroTrailer  = $destacada?->trailer_url ?? null;
@endphp

<section class="hero-section" @if($heroPoster) style="background-image: linear-gradient(to right, rgba(0,0,0,0.88) 38%, rgba(0,0,0,0.35)), url('{{ $heroPoster }}'); background-size: cover; background-position: center top;" @endif>
    <div class="hero-badge-vertical">ESTRENA</div>

    <div class="hero-content">
        <h1 class="hero-title" id="heroTitle">{{ strtoupper($heroTitle) }}</h1>
        <p class="hero-subtitle" id="heroSubtitle">{{ Str::limit($heroSynopsis, 120) }}</p>

        <div id="heroTags" class="flex flex-wrap gap-2 justify-center mb-6">
            @if($destacada)
                @foreach($destacada->categorias->take(3) as $cat)
                    <span class="px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest
                                 bg-cinema-accent/20 text-cinema-accent border border-cinema-accent/40">
                        {{ $cat->nombre }}
                    </span>
                @endforeach
                @if($destacada->duracion_min)
                    <span class="px-4 py-1 rounded-full text-xs font-semibold
                                 bg-white/5 text-cinema-muted border border-white/10">
                        {{ $destacada->duracion_min }} min
                    </span>
                @endif
            @elseif($tmdbHero ?? null)
                @foreach(array_slice(explode(',', $tmdbHero['genre'] ?? ''), 0, 3) as $g)
                    @if(trim($g))
                        <span class="px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest
                                     bg-cinema-accent/20 text-cinema-accent border border-cinema-accent/40">
                            {{ trim($g) }}
                        </span>
                    @endif
                @endforeach
                @if($tmdbHero['year'] ?? null)
                    <span class="px-4 py-1 rounded-full text-xs font-semibold
                                 bg-white/5 text-cinema-muted border border-white/10">
                        {{ $tmdbHero['year'] }}
                    </span>
                @endif
                @if($tmdbHero['stars'] ?? null)
                    <span class="px-4 py-1 rounded-full text-xs font-semibold
                                 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                        <i class="fas fa-star mr-1"></i>{{ number_format($tmdbHero['stars'], 1) }}/5
                    </span>
                @endif
            @endif
        </div>

        <div class="hero-buttons" id="heroButtons">
            <a href="{{ $heroLink }}" class="btn btn-primary btn-lg">
                <i class="fas fa-ticket-alt mr-2"></i>Comprar Entrades
            </a>
            @if($heroTrailer)
                <a href="{{ $heroTrailer }}" target="_blank" rel="noopener" class="btn btn-secondary btn-lg">
                    <i class="fas fa-play mr-2"></i>Ver Tràiler
                </a>
            @endif
        </div>
    </div>

    <div class="hero-overlay"></div>
</section>

{{-- ======================================================
     Secció Cartelera — Carousel
     ====================================================== --}}
<section class="container" style="padding-top:3rem;padding-bottom:1rem;">
    <div class="section-header">
        <div>
            <h2 class="section-title">EN CARTELLERA</h2>
            <p class="text-cinema-muted text-sm mt-1">Les millors pel·lícules ara en pantalla</p>
        </div>
        <div class="flex gap-2">
            <a href="{{ route('peliculas.index') }}" class="btn btn-secondary btn-sm">Veure tot →</a>
            @auth
                @if(auth()->user()->isAdmin())
                    <a href="{{ route('peliculas.external.index') }}" class="btn btn-secondary btn-sm"
                       title="Catálogo TMDB — solo admin">
                        <i class="fas fa-satellite-dish mr-1"></i>TMDB
                    </a>
                @endif
            @endauth
        </div>
    </div>

    {{-- Carousel --}}
    <div class="relative">
        <button id="carouselPrev" onclick="moveCarousel(-1)"
                class="absolute -left-5 top-1/2 -translate-y-1/2 z-10
                       w-11 h-11 rounded-full flex items-center justify-center
                       border-2 border-white/15 bg-black/70 text-white text-xl
                       hover:bg-cinema-accent/80 backdrop-blur-sm transition-all cursor-pointer">
            &#8249;
        </button>

        <div class="overflow-hidden">
            <div id="carouselTrack" class="flex gap-6 transition-transform duration-400 will-change-transform">
                @forelse($peliculas as $pelicula)
                    <div class="card-movie flex-none" style="width: calc(25% - 1.125rem);">
                        <img src="{{ $pelicula->poster_url }}"
                             alt="Poster de {{ $pelicula->titulo }}"
                             class="w-full h-full object-cover block">

                        <div class="card-movie-overlay">
                            <div class="text-center px-4">
                                <p class="text-white font-bold text-sm uppercase tracking-wider mb-3">
                                    {{ $pelicula->titulo }}
                                </p>
                                <a href="{{ route('peliculas.show', $pelicula) }}"
                                   class="btn btn-primary btn-sm w-full">Veure</a>
                            </div>
                        </div>

                        @if($pelicula->categorias->first())
                            <div class="card-movie-badge">{{ $pelicula->categorias->first()->nombre }}</div>
                        @endif

                        <div class="absolute bottom-0 left-0 right-0 p-4"
                             style="background: linear-gradient(to top,rgba(0,0,0,0.95),transparent);">
                            <p class="font-bold text-sm uppercase tracking-wide truncate mb-0.5">{{ $pelicula->titulo }}</p>
                            @if($pelicula->duracion_min)
                                <p class="text-cinema-muted text-xs">
                                    {{ $pelicula->duracion_min }} min
                                    <span class="opacity-40 mx-0.5">·</span>
                                    {{ $pelicula->classificacio_edad ?? 'TP' }}
                                </p>
                            @endif
                        </div>
                    </div>
                @empty
                    <p class="text-cinema-muted">No hi ha pel·lícules disponibles.</p>
                @endforelse
            </div>
        </div>

        <button id="carouselNext" onclick="moveCarousel(1)"
                class="absolute -right-5 top-1/2 -translate-y-1/2 z-10
                       w-11 h-11 rounded-full flex items-center justify-center
                       border-2 border-white/15 bg-black/70 text-white text-xl
                       hover:bg-cinema-accent/80 backdrop-blur-sm transition-all cursor-pointer">
            &#8250;
        </button>
    </div>

    <div id="carouselDots" class="flex justify-center gap-2 mt-6"></div>

    <script>
    (function(){
        const track  = document.getElementById('carouselTrack');
        const dotsEl = document.getElementById('carouselDots');
        const visible = () => window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;
        let current = 0;

        function maxIndex() { return Math.max(0, Array.from(track.children).length - visible()); }

        function buildDots() {
            dotsEl.innerHTML = '';
            const pages = maxIndex() + 1;
            for (let i = 0; i < pages; i++) {
                const d = document.createElement('button');
                const active = i === current;
                d.style.cssText = `width:8px;height:8px;border-radius:50%;border:none;padding:0;cursor:pointer;
                    transition:background .2s,transform .2s;
                    background:${active ? 'var(--color-accent-bright)' : 'rgba(255,255,255,0.25)'};
                    transform:${active ? 'scale(1.3)' : 'scale(1)'};`;
                d.onclick = () => goto(i);
                dotsEl.appendChild(d);
            }
        }

        function goto(idx) {
            current = Math.max(0, Math.min(idx, maxIndex()));
            const cardW = track.children[0]?.getBoundingClientRect().width ?? 0;
            const gap = 24;
            track.style.transform = `translateX(-${current * (cardW + gap)}px)`;
            document.getElementById('carouselPrev').style.opacity = current === 0 ? '0.3' : '1';
            document.getElementById('carouselNext').style.opacity = current >= maxIndex() ? '0.3' : '1';
            buildDots();
        }

        window.moveCarousel = (dir) => goto(current + dir);
        window.addEventListener('resize', () => { current = Math.min(current, maxIndex()); goto(current); buildDots(); });
        buildDots();
        goto(0);
    }());
    </script>
</section>

{{-- ======================================================
     Secció Cines
     ====================================================== --}}
<section class="container" style="padding-top:2rem;padding-bottom:4rem;">
    <div class="section-header">
        <div>
            <h2 class="section-title">ELS NOSTRES CINES</h2>
            <p class="text-cinema-muted text-sm mt-1">Troba el cinema més proper a tu</p>
        </div>
        <a href="{{ route('cines.index') }}" class="btn btn-secondary btn-sm">Veure tots →</a>
    </div>

    <div class="cines-grid">
        @forelse($cines as $cine)
            <div class="card-cine">
                <a href="{{ route('cines.show', $cine) }}"
                   class="absolute inset-0 z-10 block" aria-label="{{ $cine->nombre }}"></a>

                <div class="w-full h-full flex items-center justify-center"
                     style="background: linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);">
                    <i class="fas fa-film text-white/5 text-8xl"></i>
                </div>

                <div class="card-cine-overlay z-[2]">
                    <h3 class="card-cine-title">{{ $cine->nombre }}</h3>
                    <p class="card-cine-ciudad">{{ $cine->ciudad }}</p>
                    <p class="text-white/50 text-xs mt-1">
                        {{ $cine->salas_count }} {{ $cine->salas_count == 1 ? 'sala' : 'sales' }}
                    </p>
                </div>
            </div>
        @empty
            <p class="text-cinema-muted col-span-full">No hi ha cines registrats.</p>
        @endforelse
    </div>
</section>

@endsection