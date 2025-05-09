<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\LogosController;
use App\Http\Controllers\MetadatosController;
use App\Http\Controllers\SliderController;
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
});
