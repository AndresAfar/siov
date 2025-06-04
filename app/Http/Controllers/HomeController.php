<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // $movies = Movie::latest()->paginate(20);

        // Películas agregadas recientemente (últimas 2 semanas)
        $recentMovies = Movie::where('is_published', true)
            ->where('created_at', '>=', now()->subWeeks(2))
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        // Películas destacadas
        $featuredMovies = Movie::where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        // Películas populares (puedes cambiar la lógica según tus necesidades)
        $popularMovies = Movie::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->take(12)
            ->get();

        // Todas las películas para diferentes secciones
        $allMovies = Movie::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get();

        return Inertia::render('home', [
            // 'movies' => $movies,
            'recentMovies' => $recentMovies,
            'featuredMovies' => $featuredMovies,
            'popularMovies' => $popularMovies,
            'allMovies' => $allMovies,
        ]);
    }
}
