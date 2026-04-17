<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmació de reserva</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background: #f3f4f6; margin: 0; padding: 20px; color: #1f2937; }
        .card { background: #fff; border-radius: 12px; max-width: 520px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,.1); }
        .header { background: #7f1d1d; padding: 28px 32px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: 1px; }
        .header p { color: #fca5a5; margin: 6px 0 0; font-size: 13px; }
        .body { padding: 28px 32px; }
        .greeting { font-size: 16px; margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
        .info-row:last-child { border-bottom: none; }
        .label { color: #6b7280; font-weight: 500; }
        .value { font-weight: 600; text-align: right; }
        .total-row { background: #fef2f2; border-radius: 8px; padding: 12px 16px; margin-top: 20px; display: flex; justify-content: space-between; align-items: center; }
        .total-label { font-weight: 700; color: #7f1d1d; }
        .total-value { font-size: 22px; font-weight: 800; color: #7f1d1d; }
        .footer { background: #f9fafb; padding: 18px 32px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
<div class="card">
    <div class="header">
        <h1>🎬 Cine Lumière</h1>
        <p>Confirmació de la teva reserva</p>
    </div>
    <div class="body">
        <p class="greeting">Hola, <strong>{{ $nomClient }}</strong>! La teva compra s'ha processat correctament.</p>

        <div class="info-row">
            <span class="label">Pel·lícula</span>
            <span class="value">{{ $reserva->sesion->pelicula->titulo }}</span>
        </div>
        <div class="info-row">
            <span class="label">Data i hora</span>
            <span class="value">{{ $reserva->sesion->fecha_hora->format('d/m/Y — H:i') }}</span>
        </div>
        <div class="info-row">
            <span class="label">Cinema</span>
            <span class="value">{{ $reserva->sesion->sala->cine->nombre ?? '—' }}</span>
        </div>
        <div class="info-row">
            <span class="label">Sala</span>
            <span class="value">{{ $reserva->sesion->sala->nombre ?? '—' }}</span>
        </div>
        <div class="info-row">
            <span class="label">Butaques</span>
            <span class="value">{{ $reserva->butaques_seleccionades }}</span>
        </div>
        <div class="info-row">
            <span class="label">Referència</span>
            <span class="value">#{{ str_pad($reserva->id, 6, '0', STR_PAD_LEFT) }}</span>
        </div>

        <div class="total-row">
            <span class="total-label">TOTAL PAGAT</span>
            <span class="total-value">{{ number_format($reserva->total_pagat, 2, ',', '.') }} €</span>
        </div>
    </div>
    <div class="footer">
        Presenta aquest email o la referència de reserva a la taquilla.<br>
        Gràcies per triar Cine Lumière!
    </div>
</div>
</body>
</html>
