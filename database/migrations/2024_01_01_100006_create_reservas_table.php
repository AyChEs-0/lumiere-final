<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fk_usuario_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('fk_sesion_id')->constrained('sesions')->cascadeOnDelete();
            $table->enum('tipus_entrada', ['adult', 'reduit', 'familia', 'jubilat'])->default('adult');
            $table->string('butaques_seleccionades');
            $table->decimal('total_pagat', 8, 2)->default(0);
            $table->enum('estat', ['pendent', 'pagat', 'cancelat'])->default('pendent');
            // Guest purchase fields
            $table->string('nom_client')->nullable();
            $table->string('email_client')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
