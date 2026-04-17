<?php

namespace App\Mail;

use App\Models\Reserva;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservaConfirmada extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Reserva $reserva,
        public readonly string $nomClient,
        public readonly string $emailClient,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            to: $this->emailClient,
            subject: 'Confirmació de reserva — Cine Lumière',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reserva-confirmada',
        );
    }
}
