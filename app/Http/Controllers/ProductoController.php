<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\SubCategoria;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $query = Producto::query()->with('imagenes', 'caracteristicas')->orderBy('order', 'asc');

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where('name', 'LIKE', '%' . $searchTerm . '%');
        }

        $productos = $query->paginate($perPage);

        $categorias = Categoria::select('id', 'title')->orderBy('order')->get();

        $sub_categorias = SubCategoria::select('id', 'title', 'categoria_id')->orderBy('order')->get();

        return inertia('auth/productosAdmin', [
            'productos' => $productos,
            'categorias' => $categorias,
            'sub_categorias' => $sub_categorias,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'sub_categoria_id' => 'required|exists:sub_categorias,id',
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'recomendaciones' => 'required|string',
            'archivo' => 'sometimes|file|max:2048',
        ]);

        if ($request->hasFile('archivo')) {
            # Store the archivo
            $data['archivo'] = $request->file('archivo')->store('images', 'public');
        }

        Producto::create($data);

        return redirect()->back()->with('success', 'Producto creado correctamente.');
    }
    public function update(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'sub_categoria_id' => 'required|exists:sub_categorias,id',
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'recomendaciones' => 'required|string',
            'archivo' => 'sometimes|file|max:2048',
        ]);

        $producto = Producto::find($request->id);

        if ($request->hasFile('archivo')) {
            // Delete the old image if it exists
            if ($producto->archivo) {
                $absolutePath = public_path('storage/' . $producto->archivo);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new archivo
            $data['archivo'] = $request->file('archivo')->store('images', 'public');
        }


        $producto->update($data);

        return redirect()->back()->with('success', 'Producto actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $producto = Producto::find($request->id);

        // Delete the old image if it exists
        if ($producto->archivo) {
            $absolutePath = public_path('storage/' . $producto->archivo);
            if (file_exists($absolutePath)) {
                unlink($absolutePath);
            }
        }

        $producto->delete();

        return redirect()->back()->with('success', 'Producto eliminado correctamente.');
    }
}
