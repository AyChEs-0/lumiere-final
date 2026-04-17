<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Pelicula;
use App\Services\DevsApiHubMovieService;
use Illuminate\Database\Seeder;

class PeliculaSeeder extends Seeder
{
    public function run(): void
    {
        $service = app(DevsApiHubMovieService::class);

        if ($service->isEnabled()) {
            $this->syncFromTmdb($service);
        } else {
            $this->seedSampleMovies();
        }
    }

    private function syncFromTmdb(DevsApiHubMovieService $service): void
    {
        $movies = $service->getNowPlaying();

        foreach ($movies as $ext) {
            $pelicula = Pelicula::updateOrCreate(
                ['titulo' => $ext['title']],
                [
                    'sinopsis'           => $ext['description'] ?? null,
                    'duracion_min'       => $ext['runtime']    ?? 120,
                    'classificacio_edad' => $ext['cert']       ?? 'TP',
                    'poster_path'        => $ext['image_url']  ?? null,
                    'activa'             => true,
                ]
            );

            if (! empty($ext['genre'])) {
                $categoria = Categoria::firstOrCreate(['nombre' => $ext['genre']]);
                $pelicula->categorias()->syncWithoutDetaching([$categoria->id]);
            }
        }
    }

    private function seedSampleMovies(): void
    {
        $samples = [
            ['titulo' => 'El Gran Espectacle', 'sinopsis' => 'Una aventura épica que et deixarà sense paraules.', 'duracion_min' => 120, 'classificacio_edad' => 'TP', 'poster_path' => null],
            ['titulo' => 'Nit de Llàgrimes',   'sinopsis' => 'Un drama emotiu sobre la pèrdua i la redempció.', 'duracion_min' => 105, 'classificacio_edad' => '12',  'poster_path' => null],
            ['titulo' => 'Galàxia Perduda',    'sinopsis' => 'Viatge intergalàctic en busca de la veritat.',   'duracion_min' => 135, 'classificacio_edad' => '7',   'poster_path' => null],
            ['titulo' => 'El Detectiu',        'sinopsis' => 'Thriller policial ple de girs inesperats.',      'duracion_min' => 98,  'classificacio_edad' => '16',  'poster_path' => null],
        ];

        foreach ($samples as $data) {
            Pelicula::firstOrCreate(['titulo' => $data['titulo']], $data + ['activa' => true]);
        }
    }
}
