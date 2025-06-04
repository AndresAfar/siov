<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use App\Models\UserSettings;
use App\Models\UserLogin;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'uuid', // UUID for APIs and external references
        'name',
        'last_name',
        'is_active', // Indicates if the user is active
        'email',
        'email_verified_at', // Timestamp for email verification
        'password',
        'last_login_at', // Timestamp for the last login
        'remember_token', // Token for "remember me" functionality
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function settings()
    {
        return $this->hasOne(UserSettings::class);
    }

    public function logins()
    {
        return $this->hasMany(UserLogin::class);
    }

    /**
     * Relación muchos a muchos con películas favoritas
     */
    public function favoriteMovies()
    {
        return $this->belongsToMany(Movie::class, 'user_favorite_movies', 'user_id', 'movie_id')
                    ->withTimestamps();
    }

    /**
     * Relación muchos a muchos con historial de visualización
     */
    public function watchHistory()
    {
        return $this->belongsToMany(Movie::class, 'user_watch_history', 'user_id', 'movie_id')
                    ->withTimestamps()
                    ->orderBy('user_watch_history.updated_at', 'desc');
    }

}
