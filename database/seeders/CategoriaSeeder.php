<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $genres = ['Acció', 'Comèdia', 'Drama', 'Terror', 'Ciència Ficció', 'Animació', 'Thriller', 'Romanç', 'Aventura', 'Documental', 'Fantasia', 'Suspens'];

        foreach ($genres as $nombre) {
            Categoria::firstOrCreate(['nombre' => $nombre]);
        }
    }
}
