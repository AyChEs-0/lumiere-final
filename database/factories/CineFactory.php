<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CineFactory extends Factory
{
    public function definition(): array
    {
        $cities = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza'];

        return [
            'nombre'             => 'Cine ' . fake()->company(),
            'direccion_completa' => fake()->streetAddress(),
            'ciudad'             => fake()->randomElement($cities),
            'provincia'          => fake()->state(),
        ];
    }
}
