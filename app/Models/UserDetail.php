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
        'wa',
        'ig',
        'telu_relation',
        'skills'
    ];

    /**
     * Get the user that owns this detail.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
