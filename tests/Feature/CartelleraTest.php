<?php

namespace Tests\Feature;

use App\Models\Cine;
use App\Models\Pelicula;
use App\Models\Sala;
use App\Models\Sesion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartelleraTest extends TestCase
{
    use RefreshDatabase;

    // ── Helpers ────────────────────────────────────────────────────────────

    private function peliculaConSesionFutura(array $attrs = []): Pelicula
    {
        $cine  = Cine::factory()->create();
        $sala  = Sala::factory()->create(['fk_cine_id' => $cine->id]);
        $peli  = Pelicula::factory()->create(array_merge(['activa' => true], $attrs));
        Sesion::factory()->future()->create([
            'fk_pelicula_id' => $peli->id,
            'fk_sala_id'     => $sala->id,
        ]);
        return $peli;
    }

    private function peliculaSinSesiones(array $attrs = []): Pelicula
    {
        return Pelicula::factory()->create(array_merge(['activa' => true], $attrs));
    }

    // ── Tests ──────────────────────────────────────────────────────────────

    public function test_cartelera_returns_200(): void
    {
        $response = $this->get(route('peliculas.index'));
        $response->assertStatus(200);
    }

    public function test_cartelera_shows_active_movies_with_future_sessions(): void
    {
        $peli = $this->peliculaConSesionFutura(['titulo' => 'Pelicula Visible']);

        $this->get(route('peliculas.index'))
            ->assertStatus(200)
            ->assertSee('Pelicula Visible');
    }

    public function test_cartelera_does_not_show_movies_without_future_sessions(): void
    {
        $this->peliculaSinSesiones(['titulo' => 'Sin Sesiones']);

        $this->get(route('peliculas.index'))
            ->assertStatus(200)
            ->assertDontSee('Sin Sesiones');
    }

    public function test_cartelera_does_not_show_movies_with_only_past_sessions(): void
    {
        $cine = Cine::factory()->create();
        $sala = Sala::factory()->create(['fk_cine_id' => $cine->id]);
        $peli = Pelicula::factory()->create(['titulo' => 'Pelicula Pasada', 'activa' => true]);
        Sesion::factory()->past()->create([
            'fk_pelicula_id' => $peli->id,
            'fk_sala_id'     => $sala->id,
        ]);

        $this->get(route('peliculas.index'))
            ->assertStatus(200)
            ->assertDontSee('Pelicula Pasada');
    }

    public function test_cartelera_does_not_show_inactive_movies(): void
    {
        $cine = Cine::factory()->create();
        $sala = Sala::factory()->create(['fk_cine_id' => $cine->id]);
        $peli = Pelicula::factory()->create(['titulo' => 'Pelicula Inactiva', 'activa' => false]);
        Sesion::factory()->future()->create([
            'fk_pelicula_id' => $peli->id,
            'fk_sala_id'     => $sala->id,
        ]);

        $this->get(route('peliculas.index'))
            ->assertStatus(200)
            ->assertDontSee('Pelicula Inactiva');
    }

    public function test_cartelera_shows_multiple_active_movies(): void
    {
        $peli1 = $this->peliculaConSesionFutura(['titulo' => 'Primera Pelicula']);
        $peli2 = $this->peliculaConSesionFutura(['titulo' => 'Segunda Pelicula']);

        $this->get(route('peliculas.index'))
            ->assertStatus(200)
            ->assertSee('Primera Pelicula')
            ->assertSee('Segunda Pelicula');
    }

    public function test_cartelera_shows_empty_message_when_no_movies(): void
    {
        $this->get(route('peliculas.index'))
            ->assertStatus(200)
            ->assertSee('No hi ha pel·lícules en cartellera');
    }

    public function test_cartelera_poster_uses_tmdb_cdn_for_relative_path(): void
    {
        $peli = $this->peliculaConSesionFutura([
            'titulo'      => 'Film TMDB',
            'poster_path' => '/abc123.jpg',
        ]);

        $this->assertStringContainsString(
            'image.tmdb.org/t/p/w500/abc123.jpg',
            $peli->poster_url
        );
    }

    public function test_cartelera_poster_returns_placeholder_when_null(): void
    {
        $peli = $this->peliculaConSesionFutura(['poster_path' => null]);

        $this->assertStringStartsWith('data:image/svg+xml', $peli->poster_url);
    }

    public function test_cartelera_poster_uses_full_url_when_already_absolute(): void
    {
        $url  = 'https://image.tmdb.org/t/p/w500/full.jpg';
        $peli = $this->peliculaConSesionFutura(['poster_path' => $url]);

        $this->assertSame($url, $peli->poster_url);
    }
}
