<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CineSeeder::class,
            SalaSeeder::class,
            CategoriaSeeder::class,
            PeliculaSeeder::class,
            SesionSeeder::class,
        ]);
    }
}
