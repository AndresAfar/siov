<?php
// app/Models/Actor.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Actor extends Model
{
    protected $fillable = [
        'name',
        'bio',
        'photo_url',
    ];

    /**
     * The movies that belong to the actor.
     */
    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'actor_movie')
            ->withPivot('role_name');
    }

    /**
     * Get the actor's initials for avatar fallback.
     */
    public function getInitialsAttribute(): string
    {
        $names = explode(' ', $this->name);
        $initials = '';
        
        foreach ($names as $name) {
            $initials .= strtoupper(substr($name, 0, 1));
        }
        
        return substr($initials, 0, 2);
    }
}