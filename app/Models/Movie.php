<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'uuid', 'title', 'slug', 'description', 'cover_image', 'trailer_url',
        'video_url', 'year', 'duration', 'language', 'rating',
        'is_featured', 'is_published'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movie) {
            if (empty($movie->uuid)) {
                $movie->uuid = (string) Str::uuid();
            }
        });
    }
}
