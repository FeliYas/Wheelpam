<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $solicitud = Solicitud::first();
        return inertia('auth/solicitud', [
            'solicitud' => $solicitud,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        /* si no existe crearlo */
        $solicitud = Solicitud::firstOrCreate(
            [],
            ['titulo' => $request->input('titulo')],
            ['text' => $request->input('text')]
        );
        $solicitud->update([
            'titulo' => $request->input('titulo'),
            'text' => $request->input('text'),
        ]);

        return redirect()->back()->with('success', 'Solicitud actualizada correctamente.');
    }
}
