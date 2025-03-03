<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchPosition extends Model
{
    use HasFactory;

    protected $table = 'match_positions';

    protected $fillable = [
        'match_id',
        'position',
        'quota',
    ];

    /**
     * Relationships
     */
    public function match()
    {
        return $this->belongsTo(Matches::class);
    }
}
