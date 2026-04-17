{{-- Barra de progreso del flujo de compra —
     Usa el design system oscuro del proyecto (no el fondo blanco anterior).
     Los pasos completados muestran un ✓, el paso activo va en negrita y acento rojo. --}}
<div style="background: var(--color-bg-secondary); border-bottom: 1px solid var(--border-subtle); padding: 0.6rem 2rem;">
    <div style="max-width: 700px; margin: 0 auto; display: flex; align-items: center; gap: 0;">

        <div style="display: flex; flex: 1; align-items: stretch; gap: 0;">
            @foreach([1 => 'Entrades', 2 => 'Butaques', 3 => 'Pagament'] as $n => $label)
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center;
                        padding: 0.4rem 0.25rem;
                        border-bottom: 3px solid {{ $step >= $n ? 'var(--color-accent-bright)' : 'var(--border-subtle)' }};">

                @if($step > $n)
                    {{-- Paso completado: mostrar check verde --}}
                    <span style="width: 1.1rem; height: 1.1rem; background: #16a34a; border-radius: 50%;
                                 display: flex; align-items: center; justify-content: center;
                                 font-size: 0.55rem; color: white; margin-bottom: 0.15rem; flex-shrink: 0;">
                        <i class="fas fa-check"></i>
                    </span>
                @else
                    <span style="font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase;
                                 color: {{ $step >= $n ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.2)' }};
                                 margin-bottom: 0.1rem;">
                        Pas {{ $n }}
                    </span>
                @endif

                <span style="font-size: 0.8rem;
                             font-weight: {{ $step === $n ? '900' : '400' }};
                             color: {{ $step >= $n ? 'var(--color-text-primary)' : 'rgba(255,255,255,0.2)' }};">
                    {{ $label }}
                </span>
            </div>
            @endforeach
        </div>

        {{-- Botón cancelar compra --}}
        <a href="{{ route('compra.cancel') }}"
           title="Cancel·lar compra"
           style="margin-left: 1.5rem; flex-shrink: 0; width: 2rem; height: 2rem; border-radius: 50%;
                  display: flex; align-items: center; justify-content: center;
                  background: var(--color-bg-primary); color: var(--color-text-secondary);
                  border: 1px solid var(--border-subtle); text-decoration: none;
                  transition: border-color 0.2s, color 0.2s;"
           onmouseover="this.style.borderColor='var(--color-accent-bright)';this.style.color='var(--color-accent-bright)'"
           onmouseout="this.style.borderColor='var(--border-subtle)';this.style.color='var(--color-text-secondary)'">
            <i class="fas fa-times" style="font-size: 0.7rem;"></i>
        </a>
    </div>
</div>
