<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Movie;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use MovieSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

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
