<p style="color:var(--color-text-secondary);font-size:0.875rem;margin-bottom:1.5rem;">
    Un cop eliminat el compte, totes les dades s'esborren permanentment.
</p>

<div x-data="{ open: false }">
    <button type="button" @click="open = true"
            style="background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.4);padding:0.6rem 1.5rem;border-radius:9999px;font-weight:700;font-size:0.85rem;cursor:pointer;">
        Eliminar Compte
    </button>

    <div x-show="open" x-cloak
         style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;">
        <div style="background:var(--color-bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:2rem;max-width:440px;width:90%;">
            <h3 style="font-weight:800;font-size:1rem;margin-bottom:0.75rem;">Segur que vols eliminar el compte?</h3>
            <p style="color:var(--color-text-secondary);font-size:0.85rem;margin-bottom:1.5rem;">
                Aquesta acció és irreversible. Introdueix la teva contrasenya per confirmar.
            </p>

            <form method="POST" action="{{ route('profile.destroy') }}">
                @csrf
                @method('delete')

                <div class="form-group">
                    <input type="password" name="password" placeholder="Contrasenya"
                           class="form-input" autocomplete="current-password">
                    @error('password', 'userDeletion')
                        <p class="form-error">{{ $message }}</p>
                    @enderror
                </div>

                <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
                    <button type="button" @click="open = false" class="btn btn-secondary btn-sm">Cancel·lar</button>
                    <button type="submit"
                            style="background:rgba(231,76,60,0.15);color:#e74c3c;border:1px solid rgba(231,76,60,0.4);padding:0.5rem 1.25rem;border-radius:9999px;font-weight:700;font-size:0.8rem;cursor:pointer;">
                        Eliminar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
