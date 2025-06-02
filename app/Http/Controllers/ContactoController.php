<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Contacto;
use Illuminate\Http\Request;

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
            'banner' => 'sometimes|file',
            'email' => 'sometimes|email',
            'instagram' => 'sometimes|string',
            'whatsapp' => 'sometimes|string',
            'facebook' => 'sometimes|string',
            'youtube' => 'sometimes|string',
            'linkedin' => 'sometimes|string',
            'location' => 'sometimes|string',
            'phone' => 'sometimes|string'
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
