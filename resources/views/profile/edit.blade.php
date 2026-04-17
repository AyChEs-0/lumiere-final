@extends('layout')
@section('title', 'El Meu Perfil')

@section('content')
<div class="container" style="max-width:800px;">

    <h1 class="page-title" style="margin-bottom:2rem;">El Meu Perfil</h1>

    <div style="display:flex;flex-direction:column;gap:2rem;">

        <div class="card">
            <h2 class="card-header">Informació Personal</h2>
            @include('profile.partials.update-profile-information-form')
        </div>

        <div class="card">
            <h2 class="card-header">Canviar Contrasenya</h2>
            @include('profile.partials.update-password-form')
        </div>

        <div class="card" style="border-color:rgba(231,76,60,0.3);">
            <h2 class="card-header" style="color:#e74c3c;">Zona de Perill</h2>
            @include('profile.partials.delete-user-form')
        </div>

    </div>
</div>
@endsection
