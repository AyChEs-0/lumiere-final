<?php

namespace Database\Seeders;

use App\Models\Cine;
use App\Models\Sala;
use Illuminate\Database\Seeder;

class SalaSeeder extends Seeder
{
    public function run(): void
    {
        $salas = [
            ['nombre' => 'Sala 1', 'capacidad' => 120, 'disposicion_butacas' => 'standard', 'cine' => 'Lumière Barcelona'],
            ['nombre' => 'Sala VIP', 'capacidad' => 40, 'disposicion_butacas' => 'vip',     'cine' => 'Lumière Barcelona'],
            ['nombre' => 'Sala 1', 'capacidad' => 100, 'disposicion_butacas' => 'standard', 'cine' => 'Lumière Madrid'],
            ['nombre' => 'Sala Premium', 'capacidad' => 60, 'disposicion_butacas' => 'premium', 'cine' => 'Lumière Madrid'],
            ['nombre' => 'Sala 1', 'capacidad' => 80, 'disposicion_butacas' => 'standard',  'cine' => 'Lumière Valencia'],
        ];

        foreach ($salas as $data) {
            $cine = Cine::where('nombre', $data['cine'])->first();
            if (! $cine) {
                continue;
            }

            Sala::firstOrCreate(
                ['nombre' => $data['nombre'], 'fk_cine_id' => $cine->id],
                ['capacidad' => $data['capacidad'], 'disposicion_butacas' => $data['disposicion_butacas']]
            );
        }
    }
}
