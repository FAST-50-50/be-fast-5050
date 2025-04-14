<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Relationships
     */
    public function communities()
    {
        return $this->hasMany(Community::class);
    }

    public function matches()
    {
        return $this->hasMany(Matches::class);
    }
}
