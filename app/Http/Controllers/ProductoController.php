<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Categoria;
use App\Models\Medida;
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
        $medidas = Medida::orderBy('order', 'asc')->get();
        $query = Producto::query()->with(['imagenes', 'caracteristicas', 'sub_categoria'])->orderBy('order', 'asc');

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
            'medidas' => $medidas,
        ]);
    }

    public function indexInicio()
    {
        $categorias = Categoria::orderBy('order', 'asc')->get();
        $banner = Banner::where('name', 'productos')->first();

        return inertia('productos', [
            'categorias' => $categorias,
            'banner' => $banner
        ]);
    }

    public function indexCategoria(Request $request, $id)
    {
        $categorias = Categoria::orderBy('order', 'asc')->with('subcategorias')->get();
        $productos = Producto::when($request->subcategoria, function ($query) use ($request) {
            // Si viene una subcategoría, filtra por esa directamente
            $query->where('sub_categoria_id', $request->subcategoria);
        }, function ($query) use ($id) {
            // Si no viene subcategoría, filtra por la categoría a través de la relación
            $query->whereHas('sub_categoria', function ($subQuery) use ($id) {
                $subQuery->where('categoria_id', $id);
            });
        })
            ->orderBy('order', 'asc')
            ->with(['imagenes', 'sub_categoria'])
            ->get();



        return inertia('productosCategoria', [
            'categorias' => $categorias,
            'productos' => $productos,
            'categoria_id' => $id,
            'subcategoria_id' => $request->subcategoria,
        ]);
    }


    public function productosPorMedida(Request $request)
    {

        $productos = Producto::with(['imagenes', 'sub_categoria'])->where('medida_id', $request->medida)->orderBy('order', 'asc')->get();

        return inertia('productosPorMedida', [
            'productos' => $productos,
            'medida_id' => $request->medida,
        ]);
    }

    public function showProducto($categoriaId, $productoId)
    {
        $producto = Producto::with(['imagenes', 'caracteristicas', 'sub_categoria'])->findOrFail($productoId);
        $categorias = Categoria::orderBy('order', 'asc')->with('subcategorias')->get();

        return inertia('productoShow', [
            'producto' => $producto,
            'categorias' => $categorias,

            'categoria_id' => $categoriaId,
            'subcategoria_id' => $producto->sub_categoria_id,
        ]);
    }

    public function productosBanner()
    {
        $productoBanner = Banner::where('name', 'productos')->first();
        return inertia('auth/productosBanner', ['productoBanner' => $productoBanner]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'order' => 'sometimes|nullable|string',
            'sub_categoria_id' => 'required|exists:sub_categorias,id',
            'name' => 'required|string|max:255',
            'recomendaciones' => 'sometimes|nullable|string',
            'archivo' => 'sometimes|nullable|file|max:2048',
            'featured' => 'sometimes|nullable|boolean',
            'temperatura' => 'sometimes|nullable',
            'desgaste' => 'sometimes|nullable',
            'confort' => 'sometimes|nullable',
            'description' => 'sometimes|nullable|string',
            'medida_id' => 'sometimes|nullable|exists:medidas,id',
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
            'order' => 'sometimes|nullable|string',
            'sub_categoria_id' => 'required|exists:sub_categorias,id',
            'name' => 'required|string|max:255',
            'recomendaciones' => 'sometimes|nullable|string',
            'archivo' => 'sometimes|nullable|file|max:2048',
            'featured' => 'sometimes|nullable|boolean',
            'temperatura' => 'sometimes|nullable',
            'desgaste' => 'sometimes|nullable',
            'confort' => 'sometimes|nullable',
            'description' => 'sometimes|nullable|string',
            'medida_id' => 'sometimes|nullable|exists:medidas,id',
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

    public function changeFeatured(Request $request)
    {
        $producto = Producto::find($request->id);
        $producto->featured = !$producto->featured;
        $producto->save();

        return redirect()->back()->with('success', 'Producto updated successfully.');
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
