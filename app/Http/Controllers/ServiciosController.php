<?php

namespace App\Http\Controllers;

use App\Models\Servicios;
use Illuminate\Http\Request;

class ServiciosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $servicios = Servicios::orderBy('order', 'asc')->get();
        return inertia('auth/serviciosAdmin', [
            'servicios' => $servicios,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'text' => 'required|string',
            'icon' => 'required|file',
            'order' => 'somtimes|string',
        ]);

        // Handle file upload
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('images', 'public');
            $data['icon'] = $iconPath;
        }

        Servicios::create($data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'text' => 'sometimes|string',
            'icon' => 'sometimes|file',
            'order' => 'sometimes|string',
        ]);

        $servicio = Servicios::findOrFail($request->id);

        // Handle file upload
        if ($request->hasFile('icon')) {
            // Delete the old icon if it exists
            if ($servicio->icon) {
                $absolutePath = public_path('storage/' . $servicio->icon);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new icon
            $data['icon'] = $request->file('icon')->store('images', 'public');
        }

        $servicio->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $servicio = Servicios::findOrFail($request->id);
        if (!$servicio) {
            return redirect()->back()->with('error', 'No se encontró el servicio.');
        }

        // Delete the icon if it exists
        if ($servicio->icon) {
            $absolutePath = public_path('storage/' . $servicio->icon);
            if (file_exists($absolutePath)) {
                unlink($absolutePath);
            }
        }

        $servicio->delete();
    }
}
