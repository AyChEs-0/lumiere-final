@extends('layout')
@section('title', 'Confirma la Contrasenya')

@section('content')
<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:3rem 1rem;">
    <div style="width:100%;max-width:420px;">

        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:2rem;">
            <p style="color:var(--color-text-secondary);font-size:0.875rem;margin-bottom:1.5rem;">
                Àrea segura. Confirma la teva contrasenya per continuar.
            </p>

            <form method="POST" action="{{ route('password.confirm') }}">
                @csrf
                <div class="form-group">
                    <label for="password" class="form-label">Contrasenya</label>
                    <input id="password" type="password" name="password"
                           class="form-input" required autocomplete="current-password">
                    @error('password')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary" style="width:100%;text-align:center;">
                    Confirmar
                </button>
            </form>
        </div>
    </div>
</div>
@endsection
