<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Películas destacadas
        $featuredMovies = Movie::published()
            ->featured()
            ->with(['genres', 'actors'])
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get();

        // Películas agregadas recientemente (últimos 30 días)
        $recentMovies = Movie::published()
            ->recent(30)
            ->with(['genres', 'actors'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Películas populares (puedes cambiar esta lógica según tus necesidades)
        // Por ahora, tomamos las más recientes como "populares"
        $popularMovies = Movie::published()
            ->with(['genres', 'actors'])
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        // Todas las películas para la sección general
        $allMovies = Movie::published()
            ->with(['genres', 'actors'])
            ->orderBy('title', 'asc')
            ->limit(18)
            ->get();

        return Inertia::render('home', [
            'featuredMovies' => $featuredMovies,
            'recentMovies' => $recentMovies,
            'popularMovies' => $popularMovies,
            'allMovies' => $allMovies,
        ]);
    }
}
