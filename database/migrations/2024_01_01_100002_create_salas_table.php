<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->unsignedInteger('capacidad');
            $table->enum('disposicion_butacas', ['vip', 'premium', 'standard'])->default('standard');
            $table->foreignId('fk_cine_id')->constrained('cines')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salas');
    }
};
