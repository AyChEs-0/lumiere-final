<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Pelicula;
use App\Models\Categoria;
use App\Models\Cine;
use App\Models\Sesion;
use App\Services\DevsApiHubMovieService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PeliculaController extends Controller
{
    /**
     * Cartelera pública: solo muestra películas activas con sesiones futuras.
     * La BD local es la única fuente de verdad — no se consulta TMDB en runtime.
     */
    public function index(Request $request)
    {
        // Datos para los filtros (solo días/cines con sesiones futuras reales)
        $filterDates = Sesion::selectRaw('DATE(fecha_hora) as dia')
            ->where('fecha_hora', '>=', now())
            ->distinct()->orderBy('dia')->pluck('dia');
        $filterCines = Cine::orderBy('nombre')->get()->unique('nombre')->values();
        $filterCats  = Categoria::orderBy('nombre')->get();

        // Solo películas activas que tienen al menos una sesión futura
        $query = Pelicula::with([
            'categorias',
            'sesiones' => fn($q) => $q->where('fecha_hora', '>=', now())
                                      ->with('sala.cine')
                                      ->orderBy('fecha_hora'),
        ])
        ->where('activa', true)
        ->whereHas('sesiones', fn($q) => $q->where('fecha_hora', '>=', now()));

        if ($request->filled('dia')) {
            $query->whereHas('sesiones', fn($q) =>
                $q->where('fecha_hora', '>=', now())
                  ->whereDate('fecha_hora', $request->dia)
            );
        }

        if ($request->filled('cine_id')) {
            $query->whereHas('sesiones.sala', fn($q) =>
                $q->where('fk_cine_id', $request->cine_id)
            );
        }

        if ($request->filled('categoria_id')) {
            $query->whereHas('categorias', fn($q) =>
                $q->where('categorias.id', $request->categoria_id)
            );
        }

        $peliculas = $query->get()
            ->each(fn($p) => $p->setRelation(
                'proximesSessions',
                $p->sesiones->sortBy('fecha_hora')->values()
            ));

        $filtered = $request->hasAny(['dia', 'cine_id', 'categoria_id']);

        return view('peliculas.index', compact(
            'peliculas',
            'filterDates',
            'filterCines',
            'filterCats',
            'filtered'
        ));
    }

    /**
        * Cartelera desde API externa (TMDB).
     */
    public function externalIndex(Request $request, DevsApiHubMovieService $moviesApi)
    {
        $movies = [];
        $activeFilter = 'all';

        // Solo consultamos TMDB si la API está activa y tiene key configurada.
        if ($moviesApi->isEnabled()) {
            // Orden de prioridad de filtros: género, año, estrellas, límite y fallback a listado general.
            if ($request->filled('genre')) {
                $activeFilter = 'genre';
                $movies = $moviesApi->getByGenre((string) $request->input('genre'));
            } elseif ($request->filled('year')) {
                $activeFilter = 'year';
                $movies = $moviesApi->getByYear((int) $request->input('year'));
            } elseif ($request->filled('stars')) {
                $activeFilter = 'stars';
                $movies = $moviesApi->getByStars((string) $request->input('stars'));
            } elseif ($request->filled('limit')) {
                $activeFilter = 'limit';
                $movies = $moviesApi->getByLimit((int) $request->input('limit'));
            } else {
                $movies = $moviesApi->getAll();
            }
        }

        return view('peliculas.external-index', [
            'movies' => $movies,
            'apiEnabled' => $moviesApi->isEnabled(),
            'activeFilter' => $activeFilter,
        ]);
    }

    /**
     * Detalle de película desde API externa.
     */
    public function externalShow(int $id, DevsApiHubMovieService $moviesApi)
    {
        // Si TMDB no está disponible evitamos exponer una vista vacía.
        abort_unless($moviesApi->isEnabled(), 404);

        $movie = $moviesApi->getById($id);
        // Si TMDB no devuelve la película, mantenemos comportamiento estándar 404.
        abort_if(! $movie, 404);

        return view('peliculas.external-show', [
            'movie' => $movie,
        ]);
    }

    /**
     * Formulario para crear pelicula en API externa.
     */
    public function externalCreate(DevsApiHubMovieService $moviesApi)
    {
        abort_unless($moviesApi->isEnabled(), 404);

        return view('peliculas.external-form', [
            'mode' => 'create',
            'movie' => null,
        ]);
    }

    /**
     * Guarda pelicula en API externa.
     */
    public function externalStore(Request $request, DevsApiHubMovieService $moviesApi)
    {
        abort_unless($moviesApi->isEnabled(), 404);

        if (! $moviesApi->canWrite()) {
            return back()->with('error', 'TMDB no permite crear peliculas desde esta integracion.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'year' => 'nullable|integer|min:1900|max:2100',
            'image_url' => 'nullable|url|max:2048',
            'genre' => 'nullable|string|max:80',
            'stars' => 'nullable|numeric|min:0|max:5',
        ]);

        $created = $moviesApi->createMovie($this->buildExternalPayload($validated));

        if (! $created) {
            return back()->withInput()->with('error', 'No se pudo crear la pelicula en la API externa.');
        }

        return redirect()->route('peliculas.external.index')->with('success', 'Pelicula creada en la API externa.');
    }

    /**
     * Formulario para editar pelicula en API externa.
     */
    public function externalEdit(int $id, DevsApiHubMovieService $moviesApi)
    {
        abort_unless($moviesApi->isEnabled(), 404);

        $movie = $moviesApi->getById($id);
        abort_if(! $movie, 404);

        return view('peliculas.external-form', [
            'mode' => 'edit',
            'movie' => $movie,
        ]);
    }

    /**
     * Actualiza pelicula en API externa.
     */
    public function externalUpdate(int $id, Request $request, DevsApiHubMovieService $moviesApi)
    {
        abort_unless($moviesApi->isEnabled(), 404);

        if (! $moviesApi->canWrite()) {
            return back()->with('error', 'TMDB no permite editar peliculas desde esta integracion.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'year' => 'nullable|integer|min:1900|max:2100',
            'image_url' => 'nullable|url|max:2048',
            'genre' => 'nullable|string|max:80',
            'stars' => 'nullable|numeric|min:0|max:5',
        ]);

        $payload = $this->buildExternalPayload($validated);
        $payload['id'] = $id;

        $updated = $moviesApi->updateMovie($id, $payload);

        if (! $updated) {
            return back()->withInput()->with('error', 'No se pudo actualizar la pelicula en la API externa.');
        }

        return redirect()->route('peliculas.external.index')->with('success', 'Pelicula actualizada en la API externa.');
    }

    /**
     * Elimina pelicula en API externa.
     */
    public function externalDestroy(int $id, DevsApiHubMovieService $moviesApi)
    {
        abort_unless($moviesApi->isEnabled(), 404);

        if (! $moviesApi->canWrite()) {
            return redirect()->route('peliculas.external.index')
                ->with('error', 'TMDB no permite eliminar peliculas desde esta integracion.');
        }

        $ok = $moviesApi->deleteMovie($id);

        return redirect()->route('peliculas.external.index')
            ->with($ok ? 'success' : 'error', $ok
                ? 'Pelicula eliminada en la API externa.'
                : 'No se pudo eliminar la pelicula en la API externa.');
    }

    /**
     * Sincroniza la cartelera local con peliculas de la API externa.
     */
    public function syncExternalCatalog(DevsApiHubMovieService $moviesApi)
    {
        abort_unless($moviesApi->isEnabled(), 404);

        // Cargamos cartelera externa completa para crear/actualizar catálogo local.
        $externalMovies = $moviesApi->getAll();
        if (empty($externalMovies)) {
            return redirect()->route('peliculas.external.index')
                ->with('error', 'No se pudo obtener peliculas de TMDB para sincronizar. Revisa TMDB_API_KEY.');
        }

        $created = 0;
        $updated = 0;

        DB::transaction(function () use ($externalMovies, &$created, &$updated) {
            foreach ($externalMovies as $ext) {
                // Usamos título como clave funcional para evitar duplicados al sincronizar.
                $pelicula = Pelicula::where('titulo', $ext['title'])->first();

                if (! $pelicula) {
                    $pelicula = new Pelicula();
                    $pelicula->titulo = $ext['title'];
                    $created++;
                } else {
                    $updated++;
                }

                $yearLabel = $ext['year'] ? ' [Any '.$ext['year'].']' : '';
                $desc = trim((string) ($ext['description'] ?? ''));
                $pelicula->sinopsis = $desc.$yearLabel;
                $pelicula->duracion_min = $pelicula->duracion_min ?: 120;
                $pelicula->classificacio_edad = $pelicula->classificacio_edad ?: 'TP';
                $pelicula->poster_path = $ext['image_url'] ?: $pelicula->poster_path;
                $pelicula->save();

                if (! empty($ext['genre'])) {
                    // Creamos categoría si no existe y la asociamos sin pisar relaciones previas.
                    $categoria = Categoria::firstOrCreate([
                        'nombre' => $ext['genre'],
                    ]);

                    $pelicula->categorias()->syncWithoutDetaching([$categoria->id]);
                }
            }
        });

        return redirect()->route('peliculas.index')->with(
            'success',
            "Cartelera local actualizada desde TMDB. Nuevas: {$created}, actualizadas: {$updated}."
        );
    }

    /**
     * Panel de administración de películas en formato tabla.
     */
    public function adminIndex()
    {
        $peliculas = Pelicula::with('categorias')
            ->withCount('sesiones')
            ->orderByDesc('id')
            ->get();

        return view('peliculas.admin-index', compact('peliculas'));
    }

    /**
     * Muestra el formulario para crear una nueva película.
     */
    public function create()
    {
        $categorias = Categoria::all();
        return view('peliculas.create', compact('categorias'));
    }

    /**
     * Guarda una nueva película en la base de datos.
     * Acepta tanto imagen subida como URL directa de TMDB (poster_url).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo'             => 'required|string|max:255',
            'sinopsis'           => 'nullable|string',
            'duracion_min'       => 'required|integer|min:1',
            'classificacio_edad' => 'nullable|string|max:10',
            'trailer_url'        => 'nullable|url|max:255',
            'poster'             => 'nullable|image|mimes:jpg,jpeg,png,webp,avif|max:4096',
            'poster_url'         => 'nullable|url|max:2048',
            'categorias'         => 'nullable|array',
            'categorias.*'       => 'exists:categorias,id',
        ]);

        // Sacamos los campos extra antes de pasar el array al modelo
        $categorias = $validated['categorias'] ?? [];
        unset($validated['categorias'], $validated['poster_url']);

        if ($request->hasFile('poster')) {
            // Archivo subido manualmente: generamos UUID y lo movemos a /public/uploads
            $validated['poster_path'] = $this->storePoster($request);
        } elseif ($request->filled('poster_url')) {
            // URL de TMDB seleccionada desde el widget de búsqueda
            $validated['poster_path'] = $request->input('poster_url');
        }

        // Creamos la película sin las categorías (son una tabla pivote aparte)
        $pelicula = Pelicula::create($validated);

        // Si el usuario marcó categorías, las enlazamos con la película
        if (! empty($categorias)) {
            $pelicula->categorias()->attach($categorias);
        }

        return redirect()->route('peliculas.index')->with('success', 'Película creada correctamente.');
    }

    /**
     * AJAX — Busca películas en TMDB por texto libre.
     * Solo accesible para administradores. Usado por el widget del formulario.
     */
    public function tmdbSearch(Request $request, DevsApiHubMovieService $moviesApi): JsonResponse
    {
        $q = trim((string) $request->input('q', ''));

        if (mb_strlen($q) < 2) {
            return response()->json([]);
        }

        return response()->json($moviesApi->searchByQuery($q));
    }

    /**
     * AJAX — Devuelve el detalle completo de una película TMDB por su ID.
     * El widget lo usa para auto-rellenar todos los campos del formulario.
     */
    public function tmdbDetail(int $id, DevsApiHubMovieService $moviesApi): JsonResponse
    {
        $movie = $moviesApi->getById($id);

        if (! $movie) {
            return response()->json(null, 404);
        }

        return response()->json($movie);
    }

    /**
     * Muestra el detalle de una película con sus sesiones futuras.
     */
    public function show(string $id, Request $request)
    {
        $cineId = $request->query('cine_id');
        $pelicula = Pelicula::with(['categorias', 'sesiones' => function ($q) use ($cineId) {
            $q->with('sala.cine')
              ->where('fecha_hora', '>=', now())
              ->orderBy('fecha_hora');
            if ($cineId) {
                $q->whereHas('sala', fn($s) => $s->where('fk_cine_id', $cineId));
            }
        }])->findOrFail($id);
        return view('peliculas.show', compact('pelicula', 'cineId'));
    }

    /**
     * Muestra el formulario para editar una película existente.
     */
    public function edit(string $id)
    {
        $pelicula = Pelicula::with('categorias')->findOrFail($id);
        $categorias = Categoria::all();
        return view('peliculas.edit', compact('pelicula', 'categorias'));
    }

    /**
     * Actualiza los datos de una película en la base de datos.
     */
    public function update(Request $request, string $id)
    {
        $pelicula = Pelicula::findOrFail($id);

        $validated = $request->validate([
            'titulo'             => 'required|string|max:255',
            'sinopsis'           => 'nullable|string',
            'duracion_min'       => 'required|integer|min:1',
            'classificacio_edad' => 'nullable|string|max:10',
            'trailer_url'        => 'nullable|url|max:255',
            'poster'             => 'nullable|image|mimes:jpg,jpeg,png,webp,avif|max:4096',
            'categorias'         => 'nullable|array',
            'categorias.*'       => 'exists:categorias,id',
        ]);

        // Sacamos las categorías del array validado antes de actualizar
        $categorias = $validated['categorias'] ?? [];
        unset($validated['categorias']);

        if ($request->hasFile('poster')) {
            $this->deletePoster($pelicula->poster_path);
            $validated['poster_path'] = $this->storePoster($request);
        }

        // Actualizamos los campos de la película
        $pelicula->update($validated);

        // sync() borra las categorías viejas y pone las nuevas de golpe
        $pelicula->categorias()->sync($categorias);

        return redirect()->route('peliculas.index')->with('success', 'Película actualizada correctamente.');
    }

    /**
     * Elimina una película de la base de datos.
     */
    public function destroy(string $id)
    {
        $pelicula = Pelicula::findOrFail($id);
        $this->deletePoster($pelicula->poster_path);
        $pelicula->delete();

        return redirect()->route('peliculas.index')->with('success', 'Película eliminada con éxito.');
    }

    private function storePoster(Request $request): string
    {
        $poster = $request->file('poster');
        $directory = public_path('uploads/peliculas');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $filename = Str::uuid()->toString().'.'.$poster->getClientOriginalExtension();
        $poster->move($directory, $filename);

        return 'uploads/peliculas/'.$filename;
    }

    private function deletePoster(?string $posterPath): void
    {
        if (! $posterPath) {
            return;
        }

        $absolutePath = public_path($posterPath);
        if (is_file($absolutePath)) {
            unlink($absolutePath);
        }
    }

    private function buildExternalPayload(array $validated): array
    {
        return [
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'year' => isset($validated['year']) ? (int) $validated['year'] : null,
            'image_url' => $validated['image_url'] ?? '',
            'genre' => $validated['genre'] ?? '',
            'stars' => isset($validated['stars']) ? (float) $validated['stars'] : 0,
        ];
    }
}
