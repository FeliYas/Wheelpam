<?php

namespace App\Http\Controllers;

use App\Mail\ContactoMail;
use App\Models\Banner;
use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $contactos = Contacto::first();
        return inertia('auth/contactoAdmin', [
            'contacto' => $contactos
        ]);
    }

    public function indexInicio(Request $request)
    {

        $banner = Banner::where('name', 'contacto')->first();
        return inertia('contacto', [
            'servicio' => $request->servicio,
            'banner' => $banner
        ]);
    }

    public function enviar(Request $request)
    {

        $contacto = Contacto::first();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'celular' => 'required|string',
            'empresa' => 'required|string',
            'mensaje' => 'required|string',
        ]);

        Mail::to($contacto->email)->send(new ContactoMail($validated));

        return back()->with('success', 'Consulta enviada');
    }


    public function contactoBanner()
    {
        $contactos = Banner::where('name', 'contacto')->first();
        return inertia('auth/contactoBanner', [
            'contacto' => $contactos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'banner' => 'nullable|sometimes|file',
            'email' => 'nullable|sometimes|email',
            'instagram' => 'nullable|sometimes|string',
            'whatsapp' => 'nullable|sometimes|string',
            'facebook' => 'nullable|sometimes|string',
            'youtube' => 'nullable|sometimes|string',
            'linkedin' => 'nullable|sometimes|string',
            'location' => 'nullable|sometimes|string',
            'phone' => 'nullable|sometimes|string'
        ]);

        $contacto = Contacto::first();
        // Check if the request has a file and store it
        if ($request->hasFile('banner')) {
            // Delete the old banner if it exists
            if ($contacto->banner) {
                $absolutePath = public_path('storage/' . $contacto->banner);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            $data['banner'] = $request->file('banner')->store('images', 'public');
        }


        $contacto->update($data);

        return redirect()->back()->with('success', 'Contacto updated successfully');
    }
}
