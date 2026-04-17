@extends('layout')
@section('title', 'Recuperar Contrasenya')

@section('content')
<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;">
    <div style="width:100%;max-width:420px;">

        <div style="text-align:center;margin-bottom:2rem;">
            <h1 style="font-size:1.75rem;font-weight:900;letter-spacing:0.05em;text-transform:uppercase;">
                <span style="color:var(--color-accent-bright);">CINE</span>
                <span style="color:var(--color-text-primary);"> LUMIÈRE</span>
            </h1>
            <p style="color:var(--color-text-secondary);margin-top:0.5rem;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.1em;">
                Recupera la teva contrasenya
            </p>
        </div>

        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:2rem;">

            <p style="color:var(--color-text-secondary);font-size:0.875rem;margin-bottom:1.5rem;">
                Oblidades la contrasenya? Introdueix el teu correu i t'enviarem un enllaç per restablir-la.
            </p>

            @if(session('status'))
                <div class="alert alert-success" style="margin-bottom:1.25rem;">{{ session('status') }}</div>
            @endif

            <form method="POST" action="{{ route('password.email') }}">
                @csrf
                <div class="form-group">
                    <label for="email" class="form-label">Correu electrònic</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}"
                           class="form-input" required autofocus autocomplete="username">
                    @error('email')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary" style="width:100%;text-align:center;">
                    Enviar enllaç de recuperació
                </button>
            </form>

            <p style="text-align:center;margin-top:1.5rem;font-size:0.875rem;color:var(--color-text-secondary);">
                <a href="{{ route('login') }}" style="color:var(--color-accent-bright);text-decoration:none;font-weight:700;">Tornar al login</a>
            </p>
        </div>
    </div>
</div>
@endsection
