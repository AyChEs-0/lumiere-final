<?php

namespace Database\Seeders;

use App\Models\Pelicula;
use App\Models\Sala;
use App\Models\Sesion;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SesionSeeder extends Seeder
{
    public function run(): void
    {
        $peliculas = Pelicula::where('activa', true)->get();
        $salas     = Sala::all();

        if ($peliculas->isEmpty() || $salas->isEmpty()) {
            return;
        }

        $horaris = ['16:00', '18:30', '21:00'];
        $preus   = [9.90, 10.50, 11.00];

        foreach ($peliculas as $pelicula) {
            $sala = $salas->random();

            for ($day = 1; $day <= 7; $day++) {
                $hora = $horaris[array_rand($horaris)];
                $preu = $preus[array_rand($preus)];

                Sesion::firstOrCreate([
                    'fk_sala_id'     => $sala->id,
                    'fk_pelicula_id' => $pelicula->id,
                    'fecha_hora'     => Carbon::today()->addDays($day)->setTimeFromTimeString($hora),
                ], [
                    'preu_base' => $preu,
                ]);
            }
        }
    }
}
