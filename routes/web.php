<?php

use App\Http\Controllers\ContactoController;
use App\Http\Controllers\DescargarArchivo;
use App\Http\Controllers\GarantiaController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServiciosController;
use App\Mail\PresupuestoMail;
use App\Models\Banner;
use App\Models\Categoria;
use App\Models\Contacto;
use App\Models\ContenidoInicio;
use App\Models\Marca;
use App\Models\Medida;
use App\Models\Novedad;
use App\Models\Producto;
use App\Models\Provincia;
use App\Models\Slider;
use App\Models\Solicitud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

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
                'sub_categoria.categoria',
                'medida' // esto trae también las medidas
            ])
            ->get();

        $contenido = ContenidoInicio::first();
        $novedades = Novedad::where('featured', true)->with('imagenes')->orderBy('order', 'asc')->get();
        $medidas = Medida::orderBy('order', 'asc')->get();
        return Inertia::render('home', [
            'slider' => $slider,
            'categorias' => $categorias,
            'productos' => $productos,
            'contenido' => $contenido,
            'novedades' => $novedades,
            'medidas' => $medidas,

        ]);
    })->name('home');

    Route::get('/nosotros', [NosotrosController::class, 'indexInicio']);
    Route::get('/servicios', [ServiciosController::class, 'indexInicio']);
    Route::get('/productos', [ProductoController::class, 'indexInicio']);
    Route::get('/productos/{id}', [ProductoController::class, 'indexCategoria'])->name('productos.categoria');
    Route::get('/productos/{categoriaId}/{subcategoriaId}', [ProductoController::class, 'subproductosProductos']);
    Route::get('/productos/{categoriaId}/{subcategoriaId}/{productoId}', [ProductoController::class, 'showProducto'])->name('productos.show');
    Route::get('/garantia', [GarantiaController::class, 'indexInicio'])
        ->name('garantia.index');

    Route::get('/novedades', [NovedadController::class, 'indexInicio'])
        ->name('novedades.index');

    Route::get('/novedades/{id}', [NovedadController::class, 'showNovedad']);

    Route::get('/contacto', [ContactoController::class, 'indexInicio'])
        ->name('contacto.index');

    Route::get('/solicitud-de-presupuesto', function (Request $request) {

        $banner = Banner::where('name', operator: 'solicitud')->first();


        $informacion = Solicitud::first();
        $provincias = Provincia::orderBy('name', 'asc')->with('localidades')->get();
        return Inertia::render('solicitudPresupuesto', [
            'banner' => $banner,

            'producto_id' => $request->producto_id,

            'provincias' => $provincias,
            'informacion' => $informacion,
        ]);
    })->name('solicitud.presupuesto');

    Route::get('/novedades/{id}', [NovedadController::class, 'verNovedad'])
        ->name('novedades.ver');

    Route::get('/medidas/{medida}', [ProductoController::class, 'productosPorMedida'])
        ->name('productos.medida');
});

Route::post('/contacto/enviar', [ContactoController::class, 'enviar'])->name('contacto.enviar');
Route::post('/presupuesto/enviar', function (Request $request) {
    $contacto = Contacto::first();
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'email' => 'required|email',
        'telefono' => 'required',
        'razon' => 'required|string',
        'aclaraciones' => 'nullable|string',
        'provincia' => 'nullable|string',
        'localidad' => 'nullable|string',
        'rubro' => 'nullable|string',
        'archivos.*' => 'nullable|file',
    ]);

    // Enviar mail con adjuntos
    Mail::to($contacto->email)->send(new PresupuestoMail($validated, $request->file('archivos')));

    return back()->with('success', 'Solicitud enviada correctamente');
})->name('presupuesto.enviar');


Route::get('/descargar/archivo/{id}', [DescargarArchivo::class, 'descargarArchivo'])
    ->name('descargar.archivo');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
