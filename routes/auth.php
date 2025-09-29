<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CaracteristicasController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ContenidoInicioController;
use App\Http\Controllers\GarantiaController;
use App\Http\Controllers\ImagenesProductoController;
use App\Http\Controllers\LogosController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\MedidaController;
use App\Http\Controllers\MetadatosController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServiciosController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\SubCategoriaController;
use App\Http\Controllers\ValoresController;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {


    Route::get('adm', [AuthenticatedSessionController::class, 'create'])
        ->name('adm');

    Route::post('adm', [AuthenticatedSessionController::class, 'store'])->name('login');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    # Logos
    Route::get('dashboard/logos', [LogosController::class, 'index'])->name('admin.logos');
    Route::post('dashboard/logos', [LogosController::class, 'update'])->name('admin.logos.update');
    # Metadatos
    Route::get('dashboard/metadatos', [MetadatosController::class, 'index'])->name('admin.metadatos');
    Route::post('dashboard/metadatos', [MetadatosController::class, 'update'])->name('admin.metadatos.update');
    # Slider
    Route::get('dashboard/slider', [SliderController::class, 'index'])->name('admin.slider');
    Route::post('dashboard/slider/update', [SliderController::class, 'update'])->name('admin.slider.update');
    Route::delete('dashboard/slider/destroy', [SliderController::class, 'destroy'])->name('admin.slider.destroy');
    Route::post('dashboard/slider/store', [SliderController::class, 'store'])->name('admin.slider.store');

    # Contenido Inicio
    Route::get('dashboard/contenido', [ContenidoInicioController::class, 'indexAdmin'])->name('admin.contenidoInicio');
    Route::post('dashboard/contenido/update', [ContenidoInicioController::class, 'update'])->name('admin.contenidoInicio.update');

    #Marcas
    Route::get('dashboard/marcas', [MarcaController::class, 'index'])->name('admin.marcas');
    Route::post('dashboard/marcas/store', [MarcaController::class, 'store'])->name('admin.marcas.store');
    Route::post('dashboard/marcas/update', [MarcaController::class, 'update'])->name('admin.marcas.update');
    Route::delete('dashboard/marcas/destroy', [MarcaController::class, 'destroy'])->name('admin.marcas.destroy');

    # Nosotros
    Route::get('dashboard/nosotros', [NosotrosController::class, 'index'])->name('admin.nosotros');
    Route::post('dashboard/nosotros/update', [NosotrosController::class, 'update'])->name('admin.nosotros.update');
    Route::get('dashboard/nosotros-banner', [NosotrosController::class, 'nosotrosBanner'])->name('admin.nosotros.banner');

    # Valores
    Route::get('dashboard/valores', [ValoresController::class, 'index'])->name('admin.valores');
    Route::post('dashboard/valores/update', [ValoresController::class, 'update'])->name('admin.valores.update');
    Route::post('dashboard/valores/store', [ValoresController::class, 'store'])->name('admin.valores.store');
    Route::delete('dashboard/valores/destroy', [ValoresController::class, 'destroy'])->name('admin.valores.destroy');

    # Servicios
    Route::get('dashboard/servicios', [ServiciosController::class, 'index'])->name('admin.servicios');
    Route::post('dashboard/servicios/store', [ServiciosController::class, 'store'])->name('admin.servicios.store');
    Route::post('dashboard/servicios/update', [ServiciosController::class, 'update'])->name('admin.servicios.update');
    Route::delete('dashboard/servicios/destroy', [ServiciosController::class, 'destroy'])->name('admin.servicios.destroy');
    Route::get('dashboard/servicios-banner', [ServiciosController::class, 'serviciosBanner'])->name('admin.servicios.banner');

    # Garantia
    Route::get('dashboard/garantia', [GarantiaController::class, 'index'])->name('admin.garantia');
    Route::post('dashboard/garantia/update', [GarantiaController::class, 'update'])->name('admin.garantia.update');
    Route::get('dashboard/garantia-banner', [GarantiaController::class, 'garantiaBanner'])->name('admin.garantia.banner');

    # Novedades
    Route::get('dashboard/novedades', [NovedadController::class, 'index'])->name('admin.novedades');
    Route::post('dashboard/novedades/store', [NovedadController::class, 'store'])->name('admin.novedades.store');
    Route::post('dashboard/novedades/update', [NovedadController::class, 'update'])->name('admin.novedades.update');
    Route::delete('dashboard/novedades/destroy', [NovedadController::class, 'destroy'])->name('admin.novedades.destroy');
    Route::post('dashboard/novedades/changeFeatured', [NovedadController::class, 'changeFeatured'])->name('admin.novedades.changeFeatured');

    Route::get('dashboard/novedades-banner', [NovedadController::class, 'novedadesBanner'])->name('admin.novedades.banner');

    # Contacto
    Route::get('dashboard/contacto', [ContactoController::class, 'index'])->name('admin.contacto');
    Route::post('dashboard/contacto/update', [ContactoController::class, 'update'])->name('admin.contacto.update');
    Route::get('dashboard/banner-contacto', [ContactoController::class, 'contactoBanner'])->name('admin.contacto.banner');

    # Categorias
    Route::get('dashboard/categorias', [CategoriaController::class, 'index'])->name('admin.categorias');
    Route::post('dashboard/categorias/store', [CategoriaController::class, 'store'])->name('admin.categorias.store');
    Route::post('dashboard/categorias/update', [CategoriaController::class, 'update'])->name('admin.categorias.update');
    Route::delete('dashboard/categorias/destroy', [CategoriaController::class, 'destroy'])->name('admin.categorias.destroy');
    Route::post('dashboard/categorias/changeFeatured', [CategoriaController::class, 'changeFeatured'])->name('admin.categorias.changeFeatured');

    # Sub categorias

    Route::get('dashboard/sub-categorias', [SubCategoriaController::class, 'index'])->name('admin.subcategorias');
    Route::post('dashboard/subcategorias/store', [SubCategoriaController::class, 'store'])->name('admin.subcategorias.store');
    Route::post('dashboard/subcategorias/update', [SubCategoriaController::class, 'update'])->name('admin.subcategorias.update');
    Route::delete('dashboard/subcategorias/destroy', [SubCategoriaController::class, 'destroy'])->name('admin.subcategorias.destroy');

    # Imagens de productos
    Route::get('dashboard/imagenes', [ImagenesProductoController::class, 'index'])->name('admin.imagenes');
    Route::post('dashboard/imagenes/store', [ImagenesProductoController::class, 'store'])->name('admin.imagenes.store');
    Route::post('dashboard/imagenes/update', [ImagenesProductoController::class, 'update'])->name('admin.imagenes.update');
    Route::delete('dashboard/imagenes/destroy', [ImagenesProductoController::class, 'destroy'])->name('admin.imagenes.destroy');
    Route::post('dashboard/imagenes/changePortada', [ImagenesProductoController::class, 'changePortada'])->name('admin.imagenes.changePortada');


    # Productos
    Route::get('dashboard/productos', [ProductoController::class, 'index'])->name('admin.productos');
    Route::post('dashboard/productos/store', [ProductoController::class, 'store'])->name('admin.productos.store');
    Route::post('dashboard/productos/update', [ProductoController::class, 'update'])->name('admin.productos.update');
    Route::delete('dashboard/productos/destroy', [ProductoController::class, 'destroy'])->name('admin.productos.destroy');
    Route::post('dashboard/producto/changeFeatured', [ProductoController::class, 'changeFeatured'])->name('admin.productos.changeFeatured');
    Route::get('dashboard/productos-banner', [ProductoController::class, 'productosBanner'])->name('admin.productos.banner');


    # Medidas
    Route::get('dashboard/medidas', [MedidaController::class, 'index'])->name('admin.medidas');
    Route::post('dashboard/medidas/store', [MedidaController::class, 'store'])->name('admin.medidas.store');
    Route::post('dashboard/medidas/update', [MedidaController::class, 'update'])->name('admin.medidas.update');
    Route::delete('dashboard/medidas/destroy', [MedidaController::class, 'destroy'])->name('admin.medidas.destroy');

    # Solicitud
    Route::get('dashboard/solicitud', [SolicitudController::class, 'index'])->name('admin.solicitud');
    Route::post('dashboard/solicitud/update', [SolicitudController::class, 'update'])->name('admin.solicitud.update');

    Route::resource('dashboard/caracteristicasadmin', CaracteristicasController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'admin.caracteristicas.store',
        'update' => 'admin.caracteristicas.update',
        'destroy' => 'admin.caracteristicas.destroy',
    ]);

    # banner 
    Route::post('dashboard/banners', function (Request $request) {
        $banner = Banner::where('name', $request->name)->first();

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'image' => 'required|file',
        ]);

        if ($banner) {
            // Delete the old image if it exists
            if ($banner->image) {
                $absolutePath = public_path('storage/' . $banner->image);
                if (file_exists($absolutePath)) {
                    unlink($absolutePath);
                }
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $banner->update($data);
    })->name('admin.banners.update');

    # Solicitud de presupuesto

    Route::get('dashboard/solicitud-banner', function () {
        $solicitudBanner = Banner::where('name', 'solicitud')->first();
        return inertia('auth/solicitudBanner', ['solicitudBanner' => $solicitudBanner]);
    })->name('admin.solicitud.banner');

    Route::post('dashboard/administradores/store', [RegisteredUserController::class, 'store'])->name('admin.administradores.store');
    Route::get('dashboard/administradores', [RegisteredUserController::class, 'index'])->name('admin.administradores');
    Route::post('dashboard/administradores/update', [RegisteredUserController::class, 'update'])->name('admin.administradores.update');
    Route::delete('dashboard/administradores/destroy', [RegisteredUserController::class, 'destroy'])->name('admin.administradores.destroy');
});
