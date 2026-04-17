<?php

namespace Database\Factories;

use App\Models\Cine;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre'             => 'Sala ' . fake()->numberBetween(1, 10),
            'capacidad'          => fake()->randomElement([60, 80, 100, 120, 150, 200]),
            'disposicion_butacas' => fake()->randomElement(['standard', 'premium', 'vip']),
            'fk_cine_id'         => Cine::factory(),
        ];
    }
}
