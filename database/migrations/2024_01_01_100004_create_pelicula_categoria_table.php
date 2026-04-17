<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pelicula_categoria', function (Blueprint $table) {
            $table->foreignId('fk_pelicula_id')->constrained('peliculas')->cascadeOnDelete();
            $table->foreignId('fk_categoria_id')->constrained('categorias')->cascadeOnDelete();
            $table->primary(['fk_pelicula_id', 'fk_categoria_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pelicula_categoria');
    }
};
