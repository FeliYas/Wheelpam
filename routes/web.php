<?php

use App\Http\Controllers\NosotrosController;
use App\Models\Logos;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['shareDefaultLayoutData'])->group(function () {
    Route::get('/', function () {

        return Inertia::render('home');
    })->name('home');

    Route::get('/nosotros', [NosotrosController::class, 'indexInicio']);
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
