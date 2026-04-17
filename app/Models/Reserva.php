<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Importamos el modelo Sesion para la relación
use App\Models\Sesion;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'reservas';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'fk_usuario_id',
        'fk_sesion_id',
        'tipus_entrada',
        'butaques_seleccionades',
        'total_pagat',
        'estat',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_pagat' => 'decimal:2',
        ];
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fk_usuario_id');
    }

    /**
     * Alias de compatibilidad: algunos listados cargan la relación como 'user'.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fk_usuario_id');
    }

    /**
     * Cada reserva pertenece a una sesión
     */
    public function sesion(): BelongsTo
    {
        return $this->belongsTo(Sesion::class, 'fk_sesion_id');
    }
}
