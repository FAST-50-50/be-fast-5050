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

    public function userDetail()
    {
        return $this->hasOne(UserDetail::class, 'user_id', 'user_id');
    }

    public static function joinMatch($userId, $matchId, $position)
    {
        $matchParticipant = new self();
        $matchParticipant->user_id = $userId;
        $matchParticipant->match_id = $matchId;
        $matchParticipant->position = $position;
        return $matchParticipant->save();
    }

    public static function isAlreadyJoined($userId, $matchId)
    {
        return self::where('user_id', $userId)
            ->where('match_id', $matchId)
            ->exists();
    }
}
