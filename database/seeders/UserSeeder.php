<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(['email' => 'admin@cinema.test'], [
            'name'              => 'Admin',
            'apellidos'         => 'Lumière',
            'rol'               => 'admin',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
        ]);

        User::firstOrCreate(['email' => 'cliente@cinema.test'], [
            'name'              => 'Cliente',
            'apellidos'         => 'Prueba',
            'rol'               => 'cliente',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
        ]);
    }
}
