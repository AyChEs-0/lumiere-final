<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PeliculaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'titulo'             => fake()->sentence(3),
            'sinopsis'           => fake()->paragraph(),
            'duracion_min'       => fake()->numberBetween(80, 180),
            'classificacio_edad' => fake()->randomElement(['TP', '7', '12', '16', '18']),
            'trailer_url'        => null,
            'poster_path'        => null,
            'activa'             => true,
        ];
    }

    public function withTmdbPoster(string $path = '/sample123.jpg'): static
    {
        return $this->state(fn (array $attributes) => [
            'poster_path' => $path,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'activa' => false,
        ]);
    }
}
