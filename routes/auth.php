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
use App\Http\Controllers\MetadatosController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\NovedadController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ServiciosController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SubCategoriaController;
use App\Http\Controllers\ValoresController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('adm', [AuthenticatedSessionController::class, 'create'])
        ->name('adm');

    Route::post('adm', [AuthenticatedSessionController::class, 'store']);

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

    # Servicios
    Route::get('dashboard/servicios', [ServiciosController::class, 'index'])->name('admin.servicios');
    Route::post('dashboard/servicios/store', [ServiciosController::class, 'store'])->name('admin.servicios.store');
    Route::post('dashboard/servicios/update', [ServiciosController::class, 'update'])->name('admin.servicios.update');
    Route::delete('dashboard/servicios/destroy', [ServiciosController::class, 'destroy'])->name('admin.servicios.destroy');

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


    # Productos
    Route::get('dashboard/productos', [ProductoController::class, 'index'])->name('admin.productos');
    Route::post('dashboard/productos/store', [ProductoController::class, 'store'])->name('admin.productos.store');
    Route::post('dashboard/productos/update', [ProductoController::class, 'update'])->name('admin.productos.update');
    Route::delete('dashboard/productos/destroy', [ProductoController::class, 'destroy'])->name('admin.productos.destroy');

    Route::resource('dashboard/caracteristicasadmin', CaracteristicasController::class)->only(['store', 'update', 'destroy'])->names([
        'store' => 'admin.caracteristicas.store',
        'update' => 'admin.caracteristicas.update',
        'destroy' => 'admin.caracteristicas.destroy',
    ]);
});
