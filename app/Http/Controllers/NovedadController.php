<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\ImagenesNovedad;
use App\Models\Novedad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class NovedadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $novedades = Novedad::orderBy('order', 'asc')->with('imagenes')->get();
        return inertia('auth/novedadesAdmin', [
            'novedades' => $novedades,
        ]);
    }

    public function indexInicio()
    {
        $novedades = Novedad::orderBy('order', 'asc')->with('imagenes')->get();
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

    public function verNovedad($id)
    {
        $novedad = Novedad::with('imagenes')->findOrFail($id);
        return inertia('novedad', [
            'novedad' => $novedad,
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
            'images' => 'nullable|array|min:1',
            'images.*' => 'required|file|image',
            'order' => 'sometimes|string',
            'type' => 'sometimes|string',
            'featured' => 'sometimes|boolean',
        ]);

        try {
            return DB::transaction(function () use ($request, $data) {
                // Crear el producto primero
                $producto = Novedad::create([
                    'title' => $data['title'],
                    'text' => $data['text'],
                    'order' => $data['order'] ?? null,
                    'type' => $data['type'] ?? null,
                    'featured' => $data['featured'] ?? false,
                ]);

                $createdImages = [];

                // Procesar imágenes si existen
                if ($request->hasFile(key: 'images')) {
                    foreach ($request->file('images') as $image) {
                        // Subir cada imagen
                        $imagePath = $image->store('images', 'public');

                        // Crear registro para cada imagen usando el ID del producto recién creado
                        $imageRecord = ImagenesNovedad::create([
                            'novedad_id' => $producto->id,

                            'image' => $imagePath,
                        ]);

                        $createdImages[] = $imageRecord;
                    }
                }
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el producto',
                'error' => $e->getMessage()
            ], 500);
        }
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

        try {
            return DB::transaction(function () use ($request, $data) {
                // Buscar el producto
                $producto = Novedad::findOrFail($request->id);

                // Actualizar los datos del producto
                $producto->update([
                    'title' => $data['title'] ?? $producto->title,
                    'text' => $data['text'] ?? $producto->text,
                    'order' => $data['order'] ?? $producto->order,
                    'type' => $data['type'] ?? $producto->type,
                    'featured' => $data['featured'] ?? $producto->featured,
                ]);

                if ($request->has('images_to_delete')) {
                    foreach ($request->images_to_delete as $imageId) {
                        $image = ImagenesNovedad::find($imageId);
                        if ($image) {
                            // Eliminar archivo del storage
                            Storage::delete($image->image);
                            // Eliminar registro de la base de datos
                            $image->delete();
                        }
                    }
                }

                // Agregar nuevas imágenes
                if ($request->hasFile('new_images')) {
                    foreach ($request->file('new_images') as $image) {
                        $path = $image->store('images', 'public');

                        ImagenesNovedad::create([
                            'novedad_id' => $producto->id,
                            'image' => $path,
                        ]);
                    }
                }

                // Actualizar otros campos del producto


                // Eliminar imágenes seleccionadas si se especificaron
                if ($request->has('delete_images')) {
                    $imagesToDelete = ImagenesNovedad::where('novedad_id', $producto->id)
                        ->whereIn('id', $data['delete_images'])
                        ->get();

                    foreach ($imagesToDelete as $imageRecord) {
                        // Eliminar archivo físico
                        if (Storage::disk('public')->exists($imageRecord->image)) {
                            Storage::disk('public')->delete($imageRecord->image);
                        }
                        // Eliminar registro de la base de datos
                        $imageRecord->delete();
                    }
                }

                // Procesar nuevas imágenes si existen
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        // Subir cada imagen
                        $imagePath = $image->store('images', 'public');

                        // Crear registro para cada imagen
                        ImagenesNovedad::create([
                            'novedad_id' => $producto->id,
                            'order' => $data['order'] ?? null,
                            'image' => $imagePath,
                        ]);
                    }
                }
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el producto',
                'error' => $e->getMessage()
            ], 500);
        }
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
        $id = $request->id;
        try {
            return DB::transaction(function () use ($id) {
                // Buscar la novedad
                $novedad = Novedad::findOrFail($id);

                // Eliminar todas las imágenes asociadas
                $imagenes = ImagenesNovedad::where('novedad_id', $novedad->id)->get();
                foreach ($imagenes as $imagen) {
                    // Eliminar archivo físico del storage
                    if (Storage::disk('public')->exists($imagen->image)) {
                        Storage::disk('public')->delete($imagen->image);
                    }
                    // Eliminar registro de la base de datos
                    $imagen->delete();
                }


                // Eliminar la novedad
                $novedad->delete();
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar la novedad',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
