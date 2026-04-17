<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sesions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fk_sala_id')->constrained('salas')->cascadeOnDelete();
            $table->foreignId('fk_pelicula_id')->constrained('peliculas')->cascadeOnDelete();
            $table->dateTime('fecha_hora');
            $table->decimal('preu_base', 8, 2)->default(9.90);
            $table->timestamps();

            $table->index('fecha_hora');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sesions');
    }
};
