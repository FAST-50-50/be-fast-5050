<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCommunity extends Model
{
    use HasFactory;

    protected $table = 'user_communities';

    protected $fillable = [
        'user_id',
        'community_id',
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
        'rating'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }
}
