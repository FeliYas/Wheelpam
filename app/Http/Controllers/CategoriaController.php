<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::orderBy('order', 'asc')->get();
        return inertia('auth/categoriasAdmin', [
            'categorias' => $categorias
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
            'image' => 'required|file',
            'featured' => 'sometimes|boolean'
        ]);

        // Store the image
        $data['image'] = $request->file('image')->store('images', 'public');

        // Create the category
        Categoria::create($data);

        return redirect()->back()->with('success', 'Categoria created successfully.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|string',
            'title' => 'required|string|max:255',
            'image' => 'sometimes|file',
            'featured' => 'sometimes|boolean'
        ]);

        $categoria = Categoria::find($request->id);


        if ($request->hasFile('image')) {

            if ($categoria->getAttributes()['image']) {
                $absolutePath = public_path('storage/' . $categoria->getAttributes()['image']);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $categoria->update($data);

        return redirect()->back()->with('success', 'Categoria updated successfully.');
    }

    public function changeFeatured(Request $request)
    {
        $categoria = Categoria::find($request->id);
        $categoria->featured = !$categoria->featured;
        $categoria->save();

        return redirect()->back()->with('success', 'Categoria updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $categoria = Categoria::find($request->id);

        // Check if the category exists
        if (!$categoria) {
            return redirect()->back()->with('error', 'Categoria not found.');
        }
        // Delete the image if it exists
        if ($categoria->getAttributes()['image']) {
            $absolutePath = public_path('storage/' . $categoria->getAttributes()['image']);
            if (file_exists($absolutePath)) {
                unlink($absolutePath);
            }
        }

        $categoria->delete();

        return redirect()->back()->with('success', 'Categoria deleted successfully.');
    }
}
