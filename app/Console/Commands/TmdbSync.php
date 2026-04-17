<?php

namespace App\Console\Commands;

use App\Models\Categoria;
use App\Models\Pelicula;
use App\Services\DevsApiHubMovieService;
use Illuminate\Console\Command;

class TmdbSync extends Command
{
    protected $signature = 'tmdb:sync
                            {--pages=3 : Número de páginas de TMDB a importar (20 películas/página)}
                            {--force   : Reimportar aunque la película ya exista}';

    protected $description = 'Sincroniza películas desde TMDB a la BD local (idempotente, safe en producción)';

    public function handle(DevsApiHubMovieService $api): int
    {
        if (! $api->isEnabled()) {
            $this->warn('TMDB desactivado o sin API key. Configura TMDB_API_KEY o SERVICES_MOVIES_API_API_KEY en .env.');
            return Command::FAILURE;
        }

        $pages   = (int) $this->option('pages');
        $force   = (bool) $this->option('force');
        $created = 0;
        $updated = 0;
        $errors  = 0;

        $this->info("Sincronizando TMDB → BD local ({$pages} páginas)…");

        for ($page = 1; $page <= $pages; $page++) {
            $movies = $api->getNowPlaying();

            if (empty($movies) && $page === 1) {
                // Fallback: descubrir películas populares si now_playing devuelve vacío
                $movies = $api->getByLimit(20);
            }

            if (empty($movies)) {
                $this->line("  Página {$page}: sin resultados.");
                break;
            }

            foreach ($movies as $ext) {
                $tmdbId = $ext['id'] ?? null;

                if (! $tmdbId) {
                    $errors++;
                    continue;
                }

                // Obtenemos el detalle completo (runtime, certificación, géneros con nombre)
                $detail = $api->getById($tmdbId);
                if ($detail) {
                    $ext = array_merge($ext, $detail);
                }

                $exists = $force ? false : Pelicula::where('tmdb_id', $tmdbId)->exists();

                $data = [
                    'titulo'             => $ext['title'],
                    'sinopsis'           => $ext['description']   ?? null,
                    'duracion_min'       => $detail['runtime']    ?? ($ext['runtime'] ?? null),
                    'classificacio_edad' => $detail['certification'] ?? ($ext['cert'] ?? null),
                    'poster_path'        => $ext['poster_path']   ?? null,
                    'activa'             => true,
                ];

                $pelicula = Pelicula::updateOrCreate(['tmdb_id' => $tmdbId], $data);

                if ($pelicula->wasRecentlyCreated) {
                    $created++;
                    $this->line("  + {$pelicula->titulo}");
                } else {
                    $updated++;
                }

                // Sincronizar categorías (añade sin borrar las manuales)
                $genreNames = $detail['genre_names'] ?? [];
                if (empty($genreNames) && ! empty($ext['genre'])) {
                    // Fallback: genre es una cadena "Acción, Drama"
                    $genreNames = array_map('trim', explode(',', $ext['genre']));
                }

                foreach (array_filter($genreNames) as $nombre) {
                    $categoria = Categoria::firstOrCreate(['nombre' => $nombre]);
                    $pelicula->categorias()->syncWithoutDetaching([$categoria->id]);
                }
            }

            $this->line("  Página {$page}: procesadas " . count($movies) . ' películas.');
        }

        $this->info("Sync completado — nuevas: {$created}, actualizadas: {$updated}, errores: {$errors}");

        return Command::SUCCESS;
    }
}
