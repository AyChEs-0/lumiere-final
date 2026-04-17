<?php

namespace Database\Seeders;

use App\Models\Cine;
use Illuminate\Database\Seeder;

class CineSeeder extends Seeder
{
    public function run(): void
    {
        $cines = [
            ['nombre' => 'Lumière Barcelona', 'direccion_completa' => 'Carrer de Provença, 122', 'ciudad' => 'Barcelona', 'provincia' => 'Barcelona'],
            ['nombre' => 'Lumière Madrid',    'direccion_completa' => 'Gran Vía, 46',             'ciudad' => 'Madrid',    'provincia' => 'Madrid'],
            ['nombre' => 'Lumière Valencia',  'direccion_completa' => 'Av. del Regne de València, 15', 'ciudad' => 'Valencia',  'provincia' => 'Valencia'],
        ];

        foreach ($cines as $data) {
            Cine::firstOrCreate(['nombre' => $data['nombre']], $data);
        }
    }
}
