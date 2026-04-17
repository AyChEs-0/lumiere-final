<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CineController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PeliculaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\SesionController;
use App\Http\Controllers\UserController;

// ─── Home ──────────────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');

// ─── Auth ───────────────────────────────────────────────────────────────────
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// ─── Dashboard ──────────────────────────────────────────────────────────────
Route::get('/dashboard', fn () => view('auth.dashboard'))->middleware(['auth'])->name('dashboard');
Route::get('/mi-compte', fn () => view('auth.dashboard'))->middleware(['auth'])->name('cliente.dashboard');

// ─── Profile ────────────────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ─── Cartelera (pública) ────────────────────────────────────────────────────
Route::get('/cartelera', [PeliculaController::class, 'index'])->name('peliculas.index');
Route::get('/peliculas/{pelicula}', [PeliculaController::class, 'show'])->name('peliculas.show');

// ─── Cines (públicos) ───────────────────────────────────────────────────────
Route::get('/cines', [CineController::class, 'index'])->name('cines.index');
Route::get('/cines/{cine}', [CineController::class, 'show'])->name('cines.show');

// ─── Compra (pública — funciona sin login) ──────────────────────────────────
Route::get('/comprar', [CompraController::class, 'step1'])->name('compra.step1');
Route::post('/comprar', [CompraController::class, 'step1Store'])->name('compra.step1.store');
Route::get('/comprar/butaques', [CompraController::class, 'step2'])->name('compra.step2');
Route::post('/comprar/butaques', [CompraController::class, 'step2Store'])->name('compra.step2.store');
Route::get('/comprar/pagament', [CompraController::class, 'step3'])->name('compra.step3');
Route::post('/comprar/pagament', [CompraController::class, 'step3Store'])->name('compra.step3.store');
Route::get('/comprar/confirmacio', [CompraController::class, 'confirmacio'])->name('compra.confirmacio');
Route::post('/comprar/cancel', [CompraController::class, 'cancel'])->name('compra.cancel');

// AJAX seat endpoints (pública — any user, identified by session token)
Route::post('/comprar/seat-status', [CompraController::class, 'seatStatus'])->name('compra.seat-status');
Route::post('/comprar/seat-lock', [CompraController::class, 'lockSeat'])->name('compra.seat-lock');
Route::post('/comprar/seat-unlock', [CompraController::class, 'unlockSeat'])->name('compra.seat-unlock');

// ─── Mis reservas (cliente autenticado) ─────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/mis-reserves', [ReservaController::class, 'misReservas'])->name('reservas.mis');
    Route::post('/reserves/{reserva}/cancelar', [ReservaController::class, 'cancelar'])->name('reservas.cancelar');
});

// ─── Área de gestión (admin + taquilla) ─────────────────────────────────────
Route::middleware(['auth', 'canManage'])->group(function () {

    // Admin alias routes (referenced from dashboard)
    Route::get('/admin/peliculas', [PeliculaController::class, 'adminIndex'])->name('admin.peliculas.index');
    Route::get('/admin/cines', [CineController::class, 'adminIndex'])->name('admin.cines.index');

    // Películas (gestión)
    Route::get('/peliculas', [PeliculaController::class, 'adminIndex'])->name('peliculas.admin');
    Route::get('/peliculas/crear', [PeliculaController::class, 'create'])->name('peliculas.create');
    Route::post('/peliculas', [PeliculaController::class, 'store'])->name('peliculas.store');
    Route::get('/peliculas/{pelicula}/editar', [PeliculaController::class, 'edit'])->name('peliculas.edit');
    Route::put('/peliculas/{pelicula}', [PeliculaController::class, 'update'])->name('peliculas.update');
    Route::delete('/peliculas/{pelicula}', [PeliculaController::class, 'destroy'])->name('peliculas.destroy');

    // TMDB (catálogo externo — solo admin)
    Route::middleware('isAdmin')->group(function () {
        Route::get('/tmdb', [PeliculaController::class, 'externalIndex'])->name('peliculas.external.index');
        Route::get('/tmdb/crear', [PeliculaController::class, 'externalCreate'])->name('peliculas.external.create');
        Route::post('/tmdb', [PeliculaController::class, 'externalStore'])->name('peliculas.external.store');
        Route::get('/tmdb/{id}', [PeliculaController::class, 'externalShow'])->name('peliculas.external.show');
        Route::get('/tmdb/{id}/editar', [PeliculaController::class, 'externalEdit'])->name('peliculas.external.edit');
        Route::put('/tmdb/{id}', [PeliculaController::class, 'externalUpdate'])->name('peliculas.external.update');
        Route::delete('/tmdb/{id}', [PeliculaController::class, 'externalDestroy'])->name('peliculas.external.destroy');
        Route::post('/tmdb/sincronitzar', [PeliculaController::class, 'syncExternalCatalog'])->name('peliculas.sync-external');

        // AJAX — TMDB search/detail (used in admin forms)
        Route::post('/api/tmdb/search', [PeliculaController::class, 'tmdbSearch'])->name('peliculas.tmdb-search');
        Route::post('/api/tmdb/detail/{id}', [PeliculaController::class, 'tmdbDetail'])->name('peliculas.tmdb-detail');
    });

    // Sesiones
    Route::resource('sesiones', SesionController::class);

    // Cines (gestión)
    Route::get('/cines/crear', [CineController::class, 'create'])->name('cines.create');
    Route::post('/cines', [CineController::class, 'store'])->name('cines.store');
    Route::get('/cines/{cine}/editar', [CineController::class, 'edit'])->name('cines.edit');
    Route::put('/cines/{cine}', [CineController::class, 'update'])->name('cines.update');
    Route::delete('/cines/{cine}', [CineController::class, 'destroy'])->name('cines.destroy');

    // Salas
    Route::resource('salas', SalaController::class);

    // Reservas (gestión completa)
    Route::resource('reservas', ReservaController::class);
    Route::get('/reservar', [ReservaController::class, 'reservar'])->name('reservas.reservar');
});

// ─── Usuarios (solo admin) ──────────────────────────────────────────────────
Route::middleware(['auth', 'isAdmin'])->group(function () {
    Route::resource('usuarios', UserController::class);
});
