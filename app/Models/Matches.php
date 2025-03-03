<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'sport_id',
        'community_id',
        'name',
        'description',
        'poster',
        'game_type',
        'venue',
        'address',
        'location_link',
        'date',
        'time',
        'with_fg',
        'with_vg',
        'with_referee',
        'with_linesman',
        'max_players',
        'min_players',
        'price',
        'social_link',
    ];

    protected $casts = [
        'date' => 'date',
        'time' => 'datetime:H:i:s',
        'with_fg' => 'boolean',
        'with_vg' => 'boolean',
        'with_referee' => 'boolean',
        'with_linesman' => 'boolean',
        'social_link' => 'array',
    ];

    /**
     * Relationships
     */
    public function matchPositions()
    {
        return $this->hasMany(MatchPosition::class, 'match_id', 'id');
    }

    public function matchParticipant()
    {
        return $this->hasMany(MatchParticipant::class, 'match_id', 'id');
    }


    public static function allMatches($communityId)
    {
        $user = Matches::with([
            'matchPositions' => function ($query) {
                $query->select('*'); // Adjust as needed for userDetail
            },
            'matchParticipant' => function ($query) {
                $query->select('*');
            }
        ])
            ->where('community_id', $communityId)
            ->orderBy('id', 'DESC')
            ->get();


        return $user;
    }
}
