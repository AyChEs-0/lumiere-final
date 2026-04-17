<form method="POST" action="{{ route('password.update') }}">
    @csrf
    @method('put')

    <div class="form-group">
        <label for="update_password_current_password" class="form-label">Contrasenya actual</label>
        <input id="update_password_current_password" type="password" name="current_password"
               class="form-input" autocomplete="current-password">
        @error('current_password', 'updatePassword')
            <p class="form-error">{{ $message }}</p>
        @enderror
    </div>

    <div class="form-group">
        <label for="update_password_password" class="form-label">Nova contrasenya</label>
        <input id="update_password_password" type="password" name="password"
               class="form-input" autocomplete="new-password">
        @error('password', 'updatePassword')
            <p class="form-error">{{ $message }}</p>
        @enderror
    </div>

    <div class="form-group">
        <label for="update_password_password_confirmation" class="form-label">Confirma la nova contrasenya</label>
        <input id="update_password_password_confirmation" type="password" name="password_confirmation"
               class="form-input" autocomplete="new-password">
    </div>

    <div style="display:flex;align-items:center;gap:1rem;">
        <button type="submit" class="btn btn-primary btn-sm">Actualitzar</button>
        @if(session('status') === 'password-updated')
            <span style="color:#4ade80;font-size:0.85rem;">Contrasenya actualitzada.</span>
        @endif
    </div>
</form>
