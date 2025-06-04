<?php
use Illuminate\Database\Seeder;
use App\Models\Movie;
use Illuminate\Support\Str;

class MovieSeeder extends Seeder
{
    public function run()
    {
        Movie::create([
            'uuid' => Str::uuid(),
            'title' => 'Interstellar',
            'slug' => 'interstellar',
            'description' => 'Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
            'cover_image' => 'https://example.com/images/interstellar.jpg',
            'trailer_url' => 'https://youtube.com/watch?v=zSWdZVtXT7E',
            'video_url' => 'https://cdn.example.com/movies/interstellar.mp4',
            'year' => 2014,
            'duration' => 169,
            'language' => 'en',
            'rating' => 'PG-13',
            'is_featured' => true,
            'is_published' => true,
        ]);
    }
}
