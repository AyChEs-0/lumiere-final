<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoriaFactory extends Factory
{
    public function definition(): array
    {
        $genres = ['Acció', 'Comèdia', 'Drama', 'Terror', 'Ciència Ficció', 'Animació', 'Thriller', 'Romanç', 'Aventura', 'Documental'];

        return [
            'nombre' => fake()->unique()->randomElement($genres),
        ];
    }
}
