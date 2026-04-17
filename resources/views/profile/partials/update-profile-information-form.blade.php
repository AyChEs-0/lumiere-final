<form id="send-verification" method="POST" action="{{ route('verification.send') }}">@csrf</form>

<form method="POST" action="{{ route('profile.update') }}">
    @csrf
    @method('patch')

    <div class="form-group">
        <label for="name" class="form-label">Nom</label>
        <input id="name" type="text" name="name" value="{{ old('name', $user->name) }}"
               class="form-input" required autofocus autocomplete="name">
        @error('name')<p class="form-error">{{ $message }}</p>@enderror
    </div>

    <div class="form-group">
        <label for="email" class="form-label">Correu electrònic</label>
        <input id="email" type="email" name="email" value="{{ old('email', $user->email) }}"
               class="form-input" required autocomplete="username">
        @error('email')<p class="form-error">{{ $message }}</p>@enderror

        @if($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail())
            <p style="color:var(--color-accent-bright);font-size:0.8rem;margin-top:0.5rem;">
                El teu correu no està verificat.
                <button form="send-verification"
                        style="background:none;border:none;color:var(--color-accent-bright);text-decoration:underline;cursor:pointer;font-size:0.8rem;">
                    Reenviar verificació
                </button>
            </p>
            @if(session('status') === 'verification-link-sent')
                <p class="alert alert-success" style="margin-top:0.5rem;padding:0.5rem 0.75rem;">Enllaç de verificació enviat.</p>
            @endif
        @endif
    </div>

    <div style="display:flex;align-items:center;gap:1rem;margin-top:0.5rem;">
        <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
        @if(session('status') === 'profile-updated')
            <span style="color:#4ade80;font-size:0.85rem;">Guardat correctament.</span>
        @endif
    </div>
</form>
