<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{

    protected $table = 'organizations';

    protected $fillable = [
        'key',
        'name',
        'description',
        'address',
        'phone',
    ];
}
