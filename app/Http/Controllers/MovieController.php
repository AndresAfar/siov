<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;

class MovieController extends Controller
{
    public function index(): Response
    {
        $movies = Movie::where('is_published', true)
            ->with(['genres', 'actors'])
            ->orderBy('created_at', 'desc')
            ->paginate(24);

        return Inertia::render('movies/Index', [
            'movies' => $movies
        ]);
    }

    public function show(string $slug): Response
    {
        $movie = Movie::where('slug', $slug)
            ->where('is_published', true)
            ->with(['genres', 'actors'])
            ->firstOrFail();

        // Verificar si la película está en favoritos del usuario autenticado
        $isFavorite = false;
        if (auth()->check()) {
            $isFavorite = auth()->user()->favoriteMovies()->where('movie_id', $movie->id)->exists();
        }

        // Obtener películas relacionadas basadas en géneros
        $relatedMovies = Movie::where('is_published', true)
            ->where('id', '!=', $movie->id)
            ->whereHas('genres', function($query) use ($movie) {
                $genreIds = $movie->genres->pluck('id');
                $query->whereIn('genres.id', $genreIds);
            })
            ->with(['genres'])
            ->inRandomOrder()
            ->limit(12)
            ->get();

        // Si no hay películas relacionadas por género, obtener algunas aleatorias
        if ($relatedMovies->isEmpty()) {
            $relatedMovies = Movie::where('is_published', true)
                ->where('id', '!=', $movie->id)
                ->inRandomOrder()
                ->limit(12)
                ->get();
        }

        return Inertia::render('movies/MoviePreview', [
            'movie' => $movie,
            'relatedMovies' => $relatedMovies,
            'isFavorite' => $isFavorite
        ]);
    }


    public function watch(string $slug): Response
    {
        $movie = Movie::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Aquí puedes agregar lógica para verificar permisos de usuario
        // o registrar visualizaciones

        return Inertia::render('movies/MovieWatch', [
            'movie' => $movie
        ]);
    }


    public function search(Request $request): Response
    {
        $query = $request->get('q', '');
        
        $movies = Movie::where('is_published', true)
            ->where(function($queryBuilder) use ($query) {
                $queryBuilder->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('description', 'LIKE', "%{$query}%");
            })
            ->with(['genres', 'actors'])
            ->orderBy('title', 'asc')
            ->paginate(24);

        return Inertia::render('movies/MoviesSearch', [
            'movies' => $movies,
            'query' => $query
        ]);
    }

    public function byGenre(string $genreSlug): Response
    {
        $movies = Movie::where('is_published', true)
            ->whereHas('genres', function($query) use ($genreSlug) {
                $query->where('slug', $genreSlug);
            })
            ->with(['genres', 'actors'])
            ->orderBy('created_at', 'desc')
            ->paginate(24);

        $genre = \App\Models\Genre::where('slug', $genreSlug)->firstOrFail();

        return Inertia::render('Movies/Genre', [
            'movies' => $movies,
            'genre' => $genre
        ]);
    }

    public function toggleFavorite(Movie $movie): JsonResponse
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Verificar si ya está en favoritos
        $favorite = $user->favoriteMovies()->where('movie_id', $movie->id)->first();
        
        if ($favorite) {
            // Eliminar de favoritos
            $user->favoriteMovies()->detach($movie->id);
            return response()->json([
                'success' => true,
                'is_favorite' => false,
                'message' => 'Película eliminada de favoritos'
            ]);
        } else {
            // Agregar a favoritos
            $user->favoriteMovies()->attach($movie->id, [
                'created_at' => now(),
                'updated_at' => now()
            ]);
            return response()->json([
                'success' => true,
                'is_favorite' => true,
                'message' => 'Película agregada a favoritos'
            ]);
        }
    }

    public function addToHistory(Movie $movie): JsonResponse
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Verificar si ya existe en el historial
        $historyEntry = $user->watchHistory()->where('movie_id', $movie->id)->first();
        
        if ($historyEntry) {
            // Actualizar la fecha de última visualización
            $historyEntry->pivot->update(['updated_at' => now()]);
        } else {
            // Agregar nueva entrada al historial
            $user->watchHistory()->attach($movie->id, [
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Película agregada al historial'
        ]);
    }
}
