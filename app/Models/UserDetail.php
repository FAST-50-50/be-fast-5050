<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    protected $table = 'user_details';

    protected $fillable = [
        'user_id',
        'fullname',
        'nickname',
        'birth_year',
        'whatsapp_number',
        'instagram_handle',
        'telu_relation',
        'joined_since',
        'total_matches',
        'preferred_positions',
        'favorite_position',
        'least_favorite_position',
        'game_types',
        'favorite_team',
        'experience_level',
        'owned_jerseys',
        'photo',
        'skills',
        'benefit',
        'suggestion'
    ];

    /**
     * Get the user that owns this detail.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
