<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    protected $fillable = [
        'organization_id',
        'sport_id',
        'name',
        'description',
        'logo',
        'contact',
        'ig',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function userCommunities()
    {
        return $this->hasMany(UserCommunity::class);
    }

    public function matches()
    {
        return $this->hasMany(Matches::class);
    }
}
