@extends('layout')

@section('title', 'Verifica el teu correu')

@section('content')
<div style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
    <div style="width: 100%; max-width: 480px;">

        <div style="text-align: center; margin-bottom: 2rem;">
            <h1 style="font-size: 1.75rem; font-weight: 900; letter-spacing: 0.05em; text-transform: uppercase;">
                <span style="color: var(--color-accent-bright);">CINE</span>
                <span style="color: var(--color-text-primary);"> LUMIÈRE</span>
            </h1>
            <p style="color: var(--color-text-secondary); margin-top: 0.5rem; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em;">Verifica el teu correu electrònic</p>
        </div>

        <div style="background: var(--color-bg-secondary); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 2rem;">

            {{-- Icona --}}
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <span style="font-size: 3rem;">✉️</span>
            </div>

            <p style="color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.25rem;">
                Gràcies per registrar-te! Abans de continuar, <strong style="color: var(--color-text-primary);">comprova el teu correu electrònic</strong> i fes clic a l'enllaç de verificació que t'hem enviat.
            </p>

            <p style="color: var(--color-text-secondary); font-size: 0.85rem; line-height: 1.7; margin-bottom: 1.5rem;">
                Si no has rebut el correu, comprova la carpeta de <em>spam</em> o sol·licita un de nou.
            </p>

            {{-- Alerta si s'ha reenviat --}}
            @if (session('status') == 'verification-link-sent')
                <div style="background: rgba(39,174,96,0.12); border: 1px solid rgba(39,174,96,0.4); border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.5rem;">
                    <p style="color: #27ae60; margin: 0; font-size: 0.875rem; font-weight: 600;">
                        ✓ S'ha enviat un nou correu de verificació a la teva adreça.
                    </p>
                </div>
            @endif

            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                {{-- Reenviar --}}
                <form method="POST" action="{{ route('verification.send') }}">
                    @csrf
                    <button type="submit" class="btn btn-primary" style="width: 100%; text-align: center;">
                        Reenviar correu de verificació
                    </button>
                </form>

                {{-- [NOMÉS LOCAL] Simular verificació sense SMTP --}}
                @if(app()->environment('local'))
                <form method="POST" action="{{ route('dev.verify-email') }}">
                    @csrf
                    <button type="submit" style="width: 100%; text-align: center; background: #1a3a1a; border: 1px solid #27ae60; color: #27ae60; padding: 0.65rem 1.25rem; border-radius: 8px; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;">
                        ✓ Simular verificació (només dev)
                    </button>
                </form>
                @endif

                {{-- Logout --}}
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="btn btn-secondary" style="width: 100%; text-align: center;">
                        Tancar sessió
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
