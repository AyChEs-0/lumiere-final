@extends('layout')
@section('title', 'Accedir')

@section('content')
<div style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
    <div style="width: 100%; max-width: 420px;">

        <div style="text-align: center; margin-bottom: 2rem;">
            <h1 style="font-size: 1.75rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase;">
                <span style="color: var(--color-accent-bright);">CINE</span>
                <span style="color: var(--color-text-primary);"> LUMIÈRE</span>
            </h1>
            <p style="color: var(--color-text-secondary); margin-top: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em;">Accedeix al teu compte</p>
        </div>

        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 2rem;">

            @if (session('status'))
                <div style="background: rgba(40,167,69,0.15); border: 1px solid rgba(40,167,69,0.4); color: #6fcf97; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.875rem;">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="form-group">
                    <label for="email" class="form-label">Correu electrònic</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}"
                           class="form-input" required autofocus autocomplete="username">
                    @error('email')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Contrasenya</label>
                    <input id="password" type="password" name="password"
                           class="form-input" required autocomplete="current-password">
                    @error('password')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.875rem; color: var(--color-text-secondary);">
                        <input type="checkbox" name="remember" style="accent-color: var(--color-accent-bright);">
                        Recorda'm
                    </label>
                    @if (Route::has('password.request'))
                        <a href="{{ route('password.request') }}" style="font-size: 0.875rem; color: var(--color-text-secondary); text-decoration: none;" onmouseover="this.style.color='var(--color-accent-bright)'" onmouseout="this.style.color='var(--color-text-secondary)'">
                            Contrasenya oblidada?
                        </a>
                    @endif
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; text-align: center;">
                    Entrar
                </button>
            </form>

            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--color-text-secondary);">
                Encara no tens compte?
                <a href="{{ route('register') }}" style="color: var(--color-accent-bright); text-decoration: none; font-weight: 700;">Registra't</a>
            </p>
        </div>
    </div>
</div>
@endsection
