<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

// Route::resource('categorias', CategoriaController::class);
Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');

Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');

Route::post('/categorias', [CategoriaController::class, 'store']);

Route::put('/categorias/{id}', [CategoriaController::class, 'update']);

Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy']);

Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/productos/reporte-pdf', [ProductoController::class, 'generarPdf'])
    ->name('productos.pdf');

Route::get('/categorias/{id}/reporte-pdf', [CategoriaController::class, 'generarPdf'])
    ->name('categorias.pdf');

require __DIR__.'/settings.php';
