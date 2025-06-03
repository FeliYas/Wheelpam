<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PresupuestoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $datos;
    public $archivos;

    public function __construct($datos, $archivos)
    {
        $this->datos = $datos;
        $this->archivos = $archivos;
    }

    public function build()
    {
        $email = $this->subject('Solicitud de presupuesto')
            ->view('presupuesto');

        if ($this->archivos) {
            foreach ($this->archivos as $archivo) {
                $email->attach($archivo->getRealPath(), [
                    'as' => $archivo->getClientOriginalName(),
                    'mime' => $archivo->getMimeType(),
                ]);
            }
        }

        return $email;
    }
}
