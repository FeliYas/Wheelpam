<?php

namespace App\Http\Controllers;

use App\Models\SubCategoria;
use Illuminate\Http\Request;

class SubCategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategorias = SubCategoria::orderBy('order', 'asc')->get();

        return inertia('auth/subcategoriasAdmin', [
            'subcategorias' => $subcategorias
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
            'categoria_id' => 'required|exists:categorias,id',
        ]);


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
        ]);

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
