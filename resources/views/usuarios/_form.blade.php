@php
  /** @var \App\Models\User|null $user */
  $isEdit = isset($user) && $user;
@endphp

{{-- Grid 2 columnas para nombre y apellidos --}}
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
    <div class="form-group">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" id="name" name="name" class="form-input"
               value="{{ old('name', $isEdit ? $user->name : '') }}" required>
        @error('name')<p class="form-error">{{ $message }}</p>@enderror
    </div>

    <div class="form-group">
        <label for="apellidos" class="form-label">Apellidos</label>
        <input type="text" id="apellidos" name="apellidos" class="form-input"
               value="{{ old('apellidos', $isEdit ? $user->apellidos : '') }}" required>
        @error('apellidos')<p class="form-error">{{ $message }}</p>@enderror
    </div>
</div>

<div class="form-group">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" name="email" class="form-input"
           value="{{ old('email', $isEdit ? $user->email : '') }}" required>
    @error('email')<p class="form-error">{{ $message }}</p>@enderror
</div>

{{-- Grid 2 columnas para teléfono y rol --}}
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
    <div class="form-group">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="text" id="telefono" name="telefono" class="form-input"
               value="{{ old('telefono', $isEdit ? ($user->telefono ?? '') : '') }}">
        @error('telefono')<p class="form-error">{{ $message }}</p>@enderror
    </div>

    <div class="form-group">
        <label for="rol" class="form-label">Rol</label>
        @php $rolActual = old('rol', $isEdit ? $user->rol : 'cliente'); @endphp
        <select id="rol" name="rol" class="form-select" required>
            <option value="cliente"  @selected($rolActual === 'cliente') >Cliente</option>
            <option value="admin"    @selected($rolActual === 'admin')   >Admin</option>
            <option value="taquilla" @selected($rolActual === 'taquilla')>Taquilla</option>
        </select>
        @error('rol')<p class="form-error">{{ $message }}</p>@enderror
    </div>
</div>

{{-- Grid 2 columnas para contraseñas --}}
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-0">
    <div class="form-group">
        <label for="password" class="form-label">
            Contrasenya
            @if($isEdit)
                <span class="text-cinema-muted font-normal normal-case tracking-normal text-xs ml-1">
                    (deixar en blanc si no canvia)
                </span>
            @endif
        </label>
        <input type="password" id="password" name="password" class="form-input"
               {{ $isEdit ? '' : 'required' }}>
        @error('password')<p class="form-error">{{ $message }}</p>@enderror
    </div>

    <div class="form-group">
        <label for="password_confirmation" class="form-label">Repetir Contrasenya</label>
        <input type="password" id="password_confirmation" name="password_confirmation" class="form-input"
               {{ $isEdit ? '' : 'required' }}>
    </div>
</div>
