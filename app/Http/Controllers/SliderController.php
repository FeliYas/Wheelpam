<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $slider = Slider::orderBy('order', 'asc')->get();
        return inertia('auth/sliderAdmin', [
            'slider' => $slider,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'required|string',
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'link' => 'sometimes|string|max:255',
            'media' => 'required|file',
        ]);

        if ($request->hasFile('media')) {
            $data['media'] = $request->file('media')->store('slider', 'public');
        }

        Slider::create($data);

        return redirect()->back()->with('success', 'Slider created successfully.');
    }




    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $slider = Slider::findOrFail($request->id);

        $data = $request->validate([
            'order' => 'sometimes|string',
            'title' => 'sometimes|string|max:255',
            'subtitle' => 'sometimes|string|max:255',
            'link' => 'sometimes|string|max:255',
            'media' => 'sometimes|file',
        ]);

        if ($request->hasFile('media')) {
            // Guardar la ruta del archivo antiguo para eliminarlo después
            $oldMediaPath = $slider->media;

            // Guardar el nuevo archivo
            $data['media'] = $request->file('media')->store('slider', 'public');

            // Eliminar el archivo antiguo si existe
            if ($oldMediaPath && Storage::disk('public')->exists($oldMediaPath)) {
                Storage::disk('public')->delete($oldMediaPath);
            }
        }

        $slider->update($data);
        return redirect()->back()->with('success', value: 'Slider updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $slider = Slider::findOrFail($request->id);

        // Eliminar el archivo de la carpeta pública
        if ($slider->media && Storage::disk('public')->exists($slider->media)) {
            Storage::disk('public')->delete($slider->media);
        }
        $slider->delete();
        return redirect()->back()->with('success', 'Slider deleted successfully.');
    }
}
