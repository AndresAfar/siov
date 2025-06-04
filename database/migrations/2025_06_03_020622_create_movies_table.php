<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();                // Para URLs seguras
            $table->string('title');
            $table->string('slug')->unique();              // /movies/nombre-pelicula
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();     // Imagen portada
            $table->string('trailer_url')->nullable();     // Enlace a tráiler
            $table->string('video_url')->nullable();       // Enlace al video principal (si es directo)
            $table->integer('year')->nullable();           // Año de lanzamiento
            $table->integer('duration')->nullable();       // En minutos
            $table->string('language')->default('es');
            $table->enum('rating', ['G', 'PG', 'PG-13', 'R', 'NC-17'])->nullable(); // Clasificación

            $table->boolean('is_featured')->default(false); // Para sliders o destacados
            $table->boolean('is_published')->default(true); // Control de visibilidad
            $table->timestamps();
        });

        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });


        Schema::create('genre_movie', function (Blueprint $table) {
            $table->id();
            $table->foreignId('movie_id')->constrained()->onDelete('cascade');
            $table->foreignId('genre_id')->constrained()->onDelete('cascade');
        });

        Schema::create('actors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('bio')->nullable();
            $table->string('photo_url')->nullable();
            $table->timestamps();
        });

        Schema::create('actor_movie', function (Blueprint $table) {
            $table->id();
            $table->foreignId('movie_id')->constrained()->onDelete('cascade');
            $table->foreignId('actor_id')->constrained()->onDelete('cascade');
            $table->string('role_name')->nullable(); // Ej: "Batman", "Joker"
        });



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('genre_movie');
        Schema::dropIfExists('actors');
        Schema::dropIfExists('actor_movie');
    }
};
