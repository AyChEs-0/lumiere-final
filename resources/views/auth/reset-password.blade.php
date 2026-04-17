@extends('layout')
@section('title', 'Nova Contrasenya')

@section('content')
<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;">
    <div style="width:100%;max-width:420px;">

        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:2rem;">
            <h2 style="font-size:1.25rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:1.5rem;">
                Restablir Contrasenya
            </h2>

            <form method="POST" action="{{ route('password.update') }}">
                @csrf
                <input type="hidden" name="token" value="{{ $request->route('token') }}">

                <div class="form-group">
                    <label for="email" class="form-label">Correu electrònic</label>
                    <input id="email" type="email" name="email"
                           value="{{ old('email', $request->email) }}"
                           class="form-input" required autofocus autocomplete="username">
                    @error('email')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Nova Contrasenya</label>
                    <input id="password" type="password" name="password"
                           class="form-input" required autocomplete="new-password">
                    @error('password')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password_confirmation" class="form-label">Confirma la Contrasenya</label>
                    <input id="password_confirmation" type="password" name="password_confirmation"
                           class="form-input" required autocomplete="new-password">
                </div>

                <button type="submit" class="btn btn-primary" style="width:100%;text-align:center;">
                    Restablir Contrasenya
                </button>
            </form>
        </div>
    </div>
</div>
@endsection
