<?php

use App\Http\Controllers\DescargarArchivo;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServiciosController;
use App\Models\Categoria;
use App\Models\ContenidoInicio;
use App\Models\Logos;
use App\Models\Marca;
use App\Models\Nosotros;
use App\Models\Novedad;
use App\Models\Producto;
use App\Models\Slider;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['shareDefaultLayoutData'])->group(function () {
    Route::get('/', function () {
        $slider = Slider::orderBy('order', 'asc')->get();
        $categorias = Categoria::where('featured', true)
            ->orderBy('order', 'asc')
            ->get();
        $productos = Producto::where('featured', true)
            ->orderBy('order', 'asc')
            ->with('imagenes', 'sub_categoria')
            ->get();
        $contenido = ContenidoInicio::first();
        $novedades = Novedad::where('featured', true)
            ->orderBy('order', 'asc')
            ->get();
        $marcas = Marca::orderBy('order', 'asc')->get();
        return Inertia::render('home', [
            'slider' => $slider,
            'categorias' => $categorias,
            'productos' => $productos,
            'contenido' => $contenido,
            'novedades' => $novedades,
            'marcas' => $marcas,

        ]);
    })->name('home');

    Route::get('/nosotros', [NosotrosController::class, 'indexInicio']);
    Route::get('/servicios', [ServiciosController::class, 'indexInicio']);
    Route::get('/productos', [ProductoController::class, 'indexInicio']);
});

Route::get('/descargar/archivo/{id}', [DescargarArchivo::class, 'descargarArchivo'])
    ->name('descargar.archivo');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
