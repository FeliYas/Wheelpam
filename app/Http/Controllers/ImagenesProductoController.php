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
            'order' => 'required|string',
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
            'image' => 'sometimes|file',
            'producto_id' => 'required|exists:productos,id',
        ]);

        $imagenesProducto = ImagenesProducto::find($request->id);

        // Check if the request has a file and store it
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($imagenesProducto->image) {
                $absolutePath = public_path('storage/' . $imagenesProducto->image);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        // Update the image
        $imagenesProducto->update($data);

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
