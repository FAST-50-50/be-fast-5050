<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchParticipant extends Model
{
    use HasFactory;

    protected $table = 'match_participant';

    protected $fillable = [
        'user_id',
        'match_id',
        'position',
        'team',
        'team_rank',
        'goal',
        'assist',
        'clean_sheet',
        'rating',
        'status',
    ];

    protected $casts = [
        'team_rank' => 'float',
        'goal' => 'float',
        'assist' => 'float',
        'clean_sheet' => 'float',
        'rating' => 'float',
    ];

    /**
     * Relationships
     */
    public function match()
    {
        return $this->belongsTo(Matches::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
