<?php

namespace Database\Factories;

use App\Models\Sesion;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'fk_usuario_id'          => User::factory(),
            'fk_sesion_id'           => Sesion::factory(),
            'tipus_entrada'          => fake()->randomElement(['adult', 'reduit', 'familia', 'jubilat']),
            'butaques_seleccionades' => 'A1',
            'total_pagat'            => fake()->randomFloat(2, 7, 30),
            'estat'                  => 'pagat',
            'nom_client'             => null,
            'email_client'           => null,
        ];
    }

    public function guest(): static
    {
        return $this->state(fn (array $attributes) => [
            'fk_usuario_id' => null,
            'nom_client'    => fake()->name(),
            'email_client'  => fake()->safeEmail(),
        ]);
    }
}
