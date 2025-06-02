<?php

use App\Http\Controllers\ContactoController;
use App\Http\Controllers\DescargarArchivo;
use App\Http\Controllers\GarantiaController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServiciosController;
use App\Models\Banner;
use App\Models\Categoria;
use App\Models\Contacto;
use App\Models\ContenidoInicio;
use App\Models\Garantia;
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
            ->with([
                'imagenes',
                'sub_categoria.categoria' // esto trae también la categoría
            ])
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
    Route::get('/productos/{id}', [ProductoController::class, 'indexCategoria'])->name('productos.categoria');
    Route::get('/productos/{categoriaId}/{productoId}', [ProductoController::class, 'showProducto'])->name('productos.show');
    Route::get('/garantia', [GarantiaController::class, 'indexInicio'])
        ->name('garantia.index');

    Route::get('/novedades', [NovedadController::class, 'indexInicio'])
        ->name('novedades.index');

    Route::get('/novedades/{id}', [NovedadController::class, 'showNovedad']);

    Route::get('/contacto', [ContactoController::class, 'indexInicio'])
        ->name('contacto.index');

    Route::get('/solicitud-de-presupuesto', function () {

        $banner = Banner::where('name', operator: 'solicitud')->first();

        return Inertia::render('solicitudPresupuesto', [
            'banner' => $banner,
        ]);
    })->name('solicitud.presupuesto');
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
