<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seat_locks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sesion_id')->constrained('sesions')->cascadeOnDelete();
            $table->string('butaca');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('session_token');
            $table->dateTime('expires_at');
            $table->timestamps();

            $table->unique(['sesion_id', 'butaca']);
            $table->index('expires_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seat_locks');
    }
};
