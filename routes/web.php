<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



// app routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::prefix('movies')->group(function () {
        Route::get('/', [MovieController::class, 'index'])->name('movies.index');
        // Búsqueda de películas
        Route::get('/search', [MovieController::class, 'search'])->name('search');
        
        // Películas por género
        Route::get('/genre/{genre:slug}', [MovieController::class, 'byGenre'])->name('genre');
        
        Route::get('/{movie:slug}', [MovieController::class, 'show'])->name('show');
    });
});

// Ruta para ver/reproducir película
Route::get('/watch/{movie:slug}', [MovieController::class, 'watch'])->name('movies.watch');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
