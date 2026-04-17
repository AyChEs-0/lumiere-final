<?php

namespace App\Console\Commands;

use App\Models\Pelicula;
use App\Models\Sala;
use App\Models\Sesion;
use App\Services\DevsApiHubMovieService;
use Illuminate\Console\Command;

/**
 * Crea sesiones automáticamente a partir de los estrenos actuales en España.
 * Consulta el endpoint now_playing de TMDB (region=ES) y por cada película:
 *   1. La busca en la BD local o la crea si no existe.
 *   2. Genera sesiones para los próximos 7 días (20:00h) en cada sala disponible.
 *
 * Uso manual: php artisan sesions:generate-from-releases
 * Se ejecuta automáticamente cada lunes a las 6:00.
 */
class GenerateSessionsFromReleases extends Command
{
    protected $signature   = 'sesions:generate-from-releases';
    protected $description = 'Crea sesiones para estrenos en taquilla española (TMDB now_playing)';

    public function handle(DevsApiHubMovieService $api): int
    {
        if (! $api->isEnabled()) {
            $this->warn('La API de TMDB está desactivada o sin clave. Saliendo.');
            return Command::FAILURE;
        }

        $movies = $api->getNowPlaying();
        $salas  = Sala::all();

        if ($salas->isEmpty()) {
            $this->warn('No hay salas registradas en la base de datos.');
            return Command::FAILURE;
        }

        if (empty($movies)) {
            $this->warn('TMDB no devolvió estrenos para España en este momento.');
            return Command::SUCCESS;
        }

        $this->info('Estrenos recibidos de TMDB: ' . count($movies));
        $created = 0;

        foreach ($movies as $movie) {
            // Buscamos la película en local comparando título sin distinguir mayúsculas
            $pelicula = Pelicula::whereRaw('LOWER(titulo) LIKE ?', [
                '%' . strtolower($movie['title']) . '%',
            ])->first();

            // Si no existe, la creamos con los datos básicos de TMDB
            if (! $pelicula) {
                $pelicula = Pelicula::create([
                    'titulo'          => $movie['title'],
                    'sinopsis'        => $movie['description'] ?? null,
                    'poster_path'     => $movie['image_url'] ?? null,
                    'duracion_min'    => 100, // TMDB discover no incluye runtime; usamos 100 min por defecto
                    'classificacio_edad' => null,
                ]);
                $this->line("  → Película creada: {$pelicula->titulo}");
            } else {
                $this->line("  · Película ya existe: {$pelicula->titulo}");
            }

            // Generamos una sesión por día (próximos 7 días) en cada sala
            foreach ($salas as $sala) {
                for ($dia = 1; $dia <= 7; $dia++) {
                    $fechaHora = now()->addDays($dia)->setTime(20, 0, 0);

                    // Evitamos duplicados: solo crear si no hay sesión de esta peli
                    // en esta sala dentro de la próxima semana
                    $existe = Sesion::where('fk_pelicula_id', $pelicula->id)
                        ->where('fk_sala_id', $sala->id)
                        ->whereBetween('fecha_hora', [now(), now()->addDays(8)])
                        ->exists();

                    if (! $existe) {
                        Sesion::create([
                            'fk_pelicula_id' => $pelicula->id,
                            'fk_sala_id'     => $sala->id,
                            'fecha_hora'     => $fechaHora,
                            'preu_base'      => 8.50,
                        ]);
                        $created++;
                    }
                }
            }
        }

        $this->info("Sesiones creadas: {$created}");
        return Command::SUCCESS;
    }
}
