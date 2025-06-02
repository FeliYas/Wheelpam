<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Novedad;
use Illuminate\Http\Request;

class NovedadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $novedades = Novedad::orderBy('order', 'asc')->get();
        return inertia('auth/novedadesAdmin', [
            'novedades' => $novedades,
        ]);
    }

    public function indexInicio()
    {
        $novedades = Novedad::orderBy('order', 'asc')->get();
        $banner = Banner::where('name', 'novedades')->first();
        return inertia('novedades', [
            'novedades' => $novedades,
            'banner' => $banner
        ]);
    }

    public function novedadesBanner()
    {
        $novedades = Banner::where('name', 'novedades')->first();
        return inertia('auth/novedadesBanner', [
            'novedadesBanner' => $novedades,
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
            'image' => 'required|file',
            'order' => 'sometimes|string',
            'type' => 'sometimes|string',
            'featured' => 'sometimes|boolean',
        ]);

        // Handle file upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $data['image'] = $imagePath;
        }

        Novedad::create($data);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'text' => 'sometimes|string',
            'image' => 'sometimes|file',
            'order' => 'sometimes|string',
            'type' => 'sometimes|string',
            'featured' => 'sometimes|boolean',
        ]);

        $novedad = Novedad::findOrFail($request->id);

        // Handle file upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($novedad->image) {
                $absolutePath = public_path('storage/' . $novedad->image);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $novedad->update($data);
    }

    public function changeFeatured(Request $request)
    {
        $novedad = Novedad::findOrFail($request->id);
        if (!$novedad) {
            return redirect()->back()->with('error', 'No se encontró la novedad.');
        }

        $novedad->featured = !$novedad->featured;
        $novedad->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $novedad = Novedad::findOrFail($request->id);
        if (!$novedad) {
            return redirect()->back()->with('error', 'No se encontró la novedad.');
        }

        // Delete the image if it exists
        if ($novedad->image) {
            $absolutePath = public_path('storage/' . $novedad->image);
            if (file_exists($absolutePath)) {
                unlink($absolutePath);
            }
        }

        $novedad->delete();
    }
}
