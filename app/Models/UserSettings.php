<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
    
    protected $fillable = [
        'user_id',
        'avatar_url',
        'language',
        'theme',
        'preferences',
    ];

    protected $casts = [
        'preferences' => 'array', // Cast JSON preferences to array
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
