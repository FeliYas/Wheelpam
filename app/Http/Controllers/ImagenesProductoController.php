<?php

namespace App\Http\Controllers;

use App\Models\ImagenesProducto;
use Illuminate\Http\Request;

class ImagenesProductoController extends Controller
{





    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'image' => 'required|file',
            'producto_id' => 'required|exists:productos,id',
        ]);

        // Store the image
        $data['image'] = $request->file('image')->store('images', 'public');

        // Create the image
        ImagenesProducto::create($data);

        return redirect()->back()->with('success', 'Imagen created successfully.');
    }





    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $data = $request->validate([
            'order' => 'sometimes|string',
        ]);

        $imagenesProducto = ImagenesProducto::find($request->id);

        // Update the image
        $imagenesProducto->update($data);

        return redirect()->back()->with('success', 'Imagen updated successfully.');
    }

    public function changePortada(Request $request)
    {
        $imagen = ImagenesProducto::find($request->id);
        $imagen->portada = !$imagen->portada;
        $imagen->save();

        return redirect()->back()->with('success', 'Imagen updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $imagenesProducto = ImagenesProducto::find($request->id);

        // Check if the image exists
        if (!$imagenesProducto) {
            return redirect()->back()->with('error', 'Imagen not found.');
        }

        // Delete the image
        if ($imagenesProducto->image) {
            $absolutePath = public_path('storage/' . $imagenesProducto->image);
            if (file_exists($absolutePath)) {
                unlink($absolutePath);
            }
        }

        $imagenesProducto->delete();

        return redirect()->back()->with('success', 'Imagen deleted successfully.');
    }
}
