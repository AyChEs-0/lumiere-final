<?php

namespace App\Http\Controllers;

use App\Models\Cine;
use App\Models\Pelicula;

class HomeController extends Controller
{
    public function index()
    {
        // Película destacada: la primera activa con sesiones futuras, ordenada por más sesiones
        $destacada = Pelicula::with('categorias')
            ->where('activa', true)
            ->whereHas('sesiones', fn($q) => $q->where('fecha_hora', '>=', now()))
            ->withCount(['sesiones' => fn($q) => $q->where('fecha_hora', '>=', now())])
            ->orderByDesc('sesiones_count')
            ->first();

        // Películas para el carousel (máx. 8, activas con sesiones futuras)
        $peliculas = Pelicula::with('categorias')
            ->where('activa', true)
            ->whereHas('sesiones', fn($q) => $q->where('fecha_hora', '>=', now()))
            ->limit(8)
            ->get();

        // Cines para la sección inferior
        $cines = Cine::withCount('salas')->orderBy('nombre')->limit(6)->get();

        $tmdbHero = null; // TMDB no se consulta en runtime; la BD local es la fuente de verdad

        return view('home', compact('destacada', 'peliculas', 'cines', 'tmdbHero'));
    }
}
