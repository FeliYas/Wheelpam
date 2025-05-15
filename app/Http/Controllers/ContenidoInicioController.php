<?php

namespace App\Http\Controllers;

use App\Models\ContenidoInicio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContenidoInicioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexAdmin()
    {
        $contenidoInicio = ContenidoInicio::first();
        return inertia('auth/contenidoInicio', [
            'contenidoInicio' => $contenidoInicio,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'nosotros_image' => 'sometimes|file|max:2048',
            'nosotros_text' => 'sometimes|string',
            'nosotros_title' => 'sometimes|string',
            'garantia_image' => 'sometimes|file|max:2048',
            'garantia_text' => 'sometimes|string',
            'garantia_title' => 'sometimes|string',
        ]);

        $contenidoInicio = ContenidoInicio::first();

        // Si no existe ningún registro, crear uno nuevo
        if (!$contenidoInicio) {
            $contenidoInicio = new ContenidoInicio();
        }

        if ($request->hasFile('nosotros_image')) {
            // Guardar la ruta del archivo antiguo para eliminarlo después
            $oldMediaPath = $contenidoInicio->nosotros_image ?? null;

            // Guardar el nuevo archivo
            $data['nosotros_image'] = $request->file('nosotros_image')->store('images', 'public');

            // Eliminar el archivo antiguo si existe
            if ($oldMediaPath && Storage::disk('public')->exists($oldMediaPath)) {
                Storage::disk('public')->delete($oldMediaPath);
            }
        }

        if ($request->hasFile('garantia_image')) {
            // Guardar la ruta del archivo antiguo para eliminarlo después
            $oldMediaPath = $contenidoInicio->garantia_image ?? null;

            // Guardar el nuevo archivo
            $data['garantia_image'] = $request->file('garantia_image')->store('images', 'public');

            // Eliminar el archivo antiguo si existe
            if ($oldMediaPath && Storage::disk('public')->exists($oldMediaPath)) {
                Storage::disk('public')->delete($oldMediaPath);
            }
        }

        // Actualizar los datos en el modelo
        $contenidoInicio->fill($data);
        $contenidoInicio->save();

        return redirect()->back()->with('success', 'Contenido de inicio actualizado correctamente.');
    }
}
