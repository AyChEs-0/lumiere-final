@extends('layout')

@section('title', '403 – Accés Denegat')

@section('content')
<div style="max-width: 600px; margin: 80px auto; text-align: center; padding: 40px; border: 1px solid #f5c6cb; background: #fff3f3; border-radius: 8px;">
    <h1 style="font-size: 72px; margin: 0; color: #dc3545;">403</h1>
    <h2 style="color: #721c24;">Accés Denegat</h2>
    <p style="color: #555; margin: 20px 0;">
        No tens permís per accedir a aquesta secció.
        Necessites el rol <strong>admin</strong> per continuar.
    </p>
    <div style="display: flex; gap: 10px; justify-content: center; margin-top: 30px;">
        <a href="{{ url('/') }}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 3px;">
            Inici
        </a>
        @auth
        <a href="{{ route('dashboard') }}" style="padding: 10px 20px; background: #6c757d; color: white; text-decoration: none; border-radius: 3px;">
            Dashboard
        </a>
        @else
        <a href="{{ route('login') }}" style="padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 3px;">
            Iniciar Sessió
        </a>
        @endauth
    </div>
</div>
@endsection
