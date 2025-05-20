<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'community_id',
        'name',
        'description',
        'poster',
        'game_type',
        'venue',
        'address',
        'location_link',
        'location_image',
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

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    protected static function withCommonRelations($query)
    {
        return $query->with([
            'matchPositions' => function ($query) {
                $query->select('*');
            },
            // add order by in match participant
            'matchParticipant' => function ($query) {
                $query->select('*')
                    ->with(['userDetail' => function ($q) {
                        $q->select('user_id', 'fullname', 'nickname', 'photo');
                    }])
                    ->orderByRaw("
                        CASE status
                            WHEN 'JOINED' THEN 1
                            WHEN 'PENDING' THEN 2
                            WHEN 'CANCELED' THEN 3
                            ELSE 4
                        END,
                        created_at DESC
                    ");
            }

        ]);
    }

    public static function allMatches($communityId)
    {
        $query = self::withCommonRelations(new static());

        if ($communityId !== null) {
            $query->where('community_id', $communityId);
        }

        return $query->orderBy('id', 'DESC')->get();
    }

    public static function getMatchDetail($id)
    {
        return self::withCommonRelations(new static())
            ->with(['community' => function ($q) {
                $q->select('id', 'name', 'logo');
            }])
            ->find($id);
    }
}
