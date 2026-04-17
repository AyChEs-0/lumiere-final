<?php

namespace Database\Factories;

use App\Models\Pelicula;
use App\Models\Sala;
use Illuminate\Database\Eloquent\Factories\Factory;

class SesionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fk_sala_id'      => Sala::factory(),
            'fk_pelicula_id'  => Pelicula::factory(),
            'fecha_hora'      => fake()->dateTimeBetween('+1 day', '+30 days'),
            'preu_base'       => fake()->randomElement([7.50, 8.00, 9.50, 9.90, 11.00, 12.50]),
        ];
    }

    public function future(): static
    {
        return $this->state(fn (array $attributes) => [
            'fecha_hora' => fake()->dateTimeBetween('+1 hour', '+30 days'),
        ]);
    }

    public function past(): static
    {
        return $this->state(fn (array $attributes) => [
            'fecha_hora' => fake()->dateTimeBetween('-30 days', '-1 hour'),
        ]);
    }
}
