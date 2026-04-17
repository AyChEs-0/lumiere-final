<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class Pelicula extends Model
{
    use HasFactory;

    protected $fillable = [
        'tmdb_id',
        'titulo',
        'sinopsis',
        'duracion_min',
        'classificacio_edad',
        'trailer_url',
        'poster_path',
        'activa',
    ];

    protected $appends = [
        'poster_url',
    ];

    public function sesiones(): HasMany
    {
        return $this->hasMany(Sesion::class, 'fk_pelicula_id');
    }

    public function categorias(): BelongsToMany
    {
        return $this->belongsToMany(
            Categoria::class,
            'pelicula_categoria',
            'fk_pelicula_id',
            'fk_categoria_id'
        );
    }

    public function reservas(): HasManyThrough
    {
        return $this->hasManyThrough(
            Reserva::class,
            Sesion::class,
            'fk_pelicula_id',
            'fk_sesion_id'
        );
    }

    /**
     * Upcoming sessions (populated by the controller via setRelation).
     * Falls back to a live query if the relation isn't pre-loaded.
     */
    public function getProximesSessionsAttribute(): Collection
    {
        if ($this->relationLoaded('proximesSessions')) {
            return $this->getRelation('proximesSessions');
        }

        return $this->sesiones()
            ->where('fecha_hora', '>=', now())
            ->with('sala.cine')
            ->orderBy('fecha_hora')
            ->get();
    }

    /**
     * Resolves the poster URL with the following priority:
     *  1. Local uploaded file (path stored without leading slash, e.g. uploads/peliculas/xxx.jpg)
     *  2. Full external URL already stored (starts with http/https)
     *  3. TMDB relative path (starts with /) → constructed via TMDB CDN
     *  4. SVG placeholder based on the film title
     */
    public function getPosterUrlAttribute(): string
    {
        $path = $this->poster_path;

        if (! $path) {
            return $this->buildPlaceholder();
        }

        // Full external URL (including previously stored full TMDB URLs)
        if (Str::startsWith($path, ['http://', 'https://', 'data:'])) {
            return $path;
        }

        // TMDB relative path (e.g. /abc123.jpg)
        if (Str::startsWith($path, '/')) {
            $base = rtrim(config('services.movies_api.image_base_url', 'https://image.tmdb.org/t/p/w500'), '/');
            return $base . $path;
        }

        // Local file stored in public/
        return asset($path);
    }

    /**
     * Returns the SVG placeholder data URI (also callable from Blade via onerror).
     */
    public function getPosterPlaceholder(): string
    {
        return $this->buildPlaceholder();
    }

    private function buildPlaceholder(): string
    {
        $title    = trim((string) $this->titulo) ?: 'Lumiere';
        $initials = Str::upper(Str::substr(preg_replace('/\s+/', '', $title) ?? $title, 0, 2));
        $safeTitle    = htmlspecialchars($title,    ENT_QUOTES, 'UTF-8');
        $safeInitials = htmlspecialchars($initials, ENT_QUOTES, 'UTF-8');

        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" role="img" aria-label="{$safeTitle}">
    <defs>
        <linearGradient id="posterBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#7c2d12" />
        </linearGradient>
    </defs>
    <rect width="800" height="1200" fill="url(#posterBg)" rx="36" />
    <circle cx="400" cy="300" r="160" fill="rgba(255,255,255,0.08)" />
    <text x="400" y="360" text-anchor="middle" font-size="180" font-family="Arial, Helvetica, sans-serif" fill="#f8fafc" font-weight="700">{$safeInitials}</text>
    <text x="400" y="970" text-anchor="middle" font-size="48" font-family="Arial, Helvetica, sans-serif" fill="#e2e8f0" font-weight="700">{$safeTitle}</text>
    <text x="400" y="1040" text-anchor="middle" font-size="28" font-family="Arial, Helvetica, sans-serif" fill="#cbd5e1">Cartelera Lumiere</text>
</svg>
SVG;

        return 'data:image/svg+xml;charset=UTF-8,' . rawurlencode($svg);
    }
}
