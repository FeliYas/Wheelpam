<?php

namespace App\Http\Controllers;

use App\Models\Caracteristicas;
use Illuminate\Http\Request;

class CaracteristicasController extends Controller
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

        // Create the characteristic
        Caracteristicas::create($data);

        return redirect()->back()->with('success', 'Característica created successfully.');
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

        $caracteristicas = Caracteristicas::find($request->id);

        // Check if the request has a file and store it
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($caracteristicas->image) {
                $absolutePath = public_path('storage/' . $caracteristicas->image);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $caracteristicas->update($data);

        return redirect()->back()->with('success', 'Característica updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $caracteristicas = Caracteristicas::find($request->id);
        if (!$caracteristicas) {
            return redirect()->back()->with('error', 'No se encontró la característica.');
        }

        // Delete the image file if it exists
        if ($caracteristicas->image) {
            $absolutePath = public_path('storage/' . $caracteristicas->image);
            if (file_exists($absolutePath)) {
                unlink($absolutePath);
            }
        }

        $caracteristicas->delete();

        return redirect()->back()->with('success', 'Característica deleted successfully.');
    }
}
