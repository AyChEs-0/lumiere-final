@extends('layout')
@section('title', 'Registre')

@section('content')
<div style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
    <div style="width: 100%; max-width: 480px;">

        <div style="text-align: center; margin-bottom: 2rem;">
            <h1 style="font-size: 1.75rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase;">
                <span style="color: var(--color-accent-bright);">CINE</span>
                <span style="color: var(--color-text-primary);"> LUMIÈRE</span>
            </h1>
            <p style="color: var(--color-text-secondary); margin-top: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em;">Crea el teu compte</p>
        </div>

        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 2rem;">

            <form method="POST" action="{{ route('register') }}">
                @csrf

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="name" class="form-label">Nom</label>
                        <input id="name" type="text" name="name" value="{{ old('name') }}"
                               class="form-input" required autofocus autocomplete="given-name">
                        @error('name')
                            <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="apellidos" class="form-label">Cognoms</label>
                        <input id="apellidos" type="text" name="apellidos" value="{{ old('apellidos') }}"
                               class="form-input" required autocomplete="family-name">
                        @error('apellidos')
                            <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="form-group" style="margin-top: 1.25rem;">
                    <label for="email" class="form-label">Correu electrònic</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}"
                           class="form-input" required autocomplete="username">
                    @error('email')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.25rem;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="password" class="form-label">Contrasenya</label>
                        <input id="password" type="password" name="password"
                               class="form-input" required autocomplete="new-password">
                        @error('password')
                            <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="password_confirmation" class="form-label">Confirma</label>
                        <input id="password_confirmation" type="password" name="password_confirmation"
                               class="form-input" required autocomplete="new-password">
                        @error('password_confirmation')
                            <p class="form-error">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; text-align: center; margin-top: 1.75rem;">
                    Crear compte
                </button>
            </form>

            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--color-text-secondary);">
                Ja tens compte?
                <a href="{{ route('login') }}" style="color: var(--color-accent-bright); text-decoration: none; font-weight: 700;">Accedeix</a>
            </p>
        </div>
    </div>
</div>
@endsection
