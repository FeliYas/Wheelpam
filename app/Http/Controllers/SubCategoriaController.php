<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\SubCategoria;
use Illuminate\Http\Request;

class SubCategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::select('id', 'title')->orderBy('order')->get();
        $subcategorias = SubCategoria::orderBy('order', 'asc')->get();

        return inertia('auth/subcategoriasAdmin', [
            'subcategorias' => $subcategorias,
            'categorias' => $categorias,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'title' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'image' => 'nullable|file', // Validate image if provided
        ]);
        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('subcategorias', 'public');
        } else {
            $data['image'] = null; // Set to null if no image is provided
        }


        // Create the subcategory
        SubCategoria::create($data);

        return redirect()->back()->with('success', 'Subcategoria created successfully.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'title' => 'required|string|max:255',
            'categoria_id' => 'required|exists:categorias,id',
            'image' => 'nullable|file', // Validate image if provided
        ]);

        // Handle image upload if provided
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('subcategorias', 'public');
        } else {
            $data['image'] = null; // Set to null if no image is provided
        }

        $subcategoria = SubCategoria::find($request->id);

        // Update the subcategory
        $subcategoria->update($data);

        return redirect()->back()->with('success', 'Subcategoria updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $subcategoria = SubCategoria::find($request->id);



        // Check if the subcategory exists
        if (!$subcategoria) {
            return redirect()->back()->with('error', 'Subcategoria not found.');
        }



        // Delete the subcategory
        $subcategoria->delete();

        return redirect()->back()->with('success', 'Subcategoria deleted successfully.');
    }
}
