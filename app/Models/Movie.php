<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Movie extends Model
{
    protected $fillable = [
        'uuid', 'title', 'slug', 'description', 'cover_image', 'trailer_url',
        'video_url', 'year', 'duration', 'language', 'rating',
        'is_featured', 'is_published'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'year' => 'integer',
        'duration' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($movie) {
            if (empty($movie->uuid)) {
                $movie->uuid = (string) Str::uuid();
            }
            
            if (empty($movie->slug)) {
                $movie->slug = Str::slug($movie->title);
            }
        });

        static::updating(function ($movie) {
            if ($movie->isDirty('title') && empty($movie->slug)) {
                $movie->slug = Str::slug($movie->title);
            }
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * The genres that belong to the movie.
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'genre_movie');
    }

    /**
     * The actors that belong to the movie.
     */
    public function actors(): BelongsToMany
    {
        return $this->belongsToMany(Actor::class, 'actor_movie')
            ->withPivot('role_name');
    }

    /**
     * Scope a query to only include published movies.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope a query to only include featured movies.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to get recent movies.
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Get formatted duration.
     */
    public function getFormattedDurationAttribute(): string
    {
        if (!$this->duration) {
            return 'N/A';
        }
        
        $hours = floor($this->duration / 60);
        $minutes = $this->duration % 60;
        
        return $hours > 0 ? "{$hours}h {$minutes}m" : "{$minutes}m";
    }

    /**
     * Check if movie is new (created within last 14 days).
     */
    public function getIsNewAttribute(): bool
    {
        return $this->created_at >= now()->subDays(14);
    }

    /**
     * Get the rating color class.
     */
    public function getRatingColorAttribute(): string
    {
        return match($this->rating) {
            'G' => 'bg-green-500',
            'PG' => 'bg-blue-500',
            'PG-13' => 'bg-yellow-500',
            'R' => 'bg-orange-500',
            'NC-17' => 'bg-red-500',
            default => 'bg-gray-500'
        };
    }
}