<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'organization_id',
        'username',
        'phone',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // user detail relationship 1-1
    public function userDetail()
    {
        return $this->hasOne(UserDetail::class);
    }

    // organization relationship 1-1
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    // user communities relationship 1-many
    public function userCommunity()
    {
        return $this->hasMany(UserCommunity::class);
    }

    public function selectAllUsers($orgId)
    {
        $user = User::with([
            'userDetail' => function ($query) {
                $query->select('*'); // Adjust as needed for userDetail
            },
            'userCommunity' => function ($query) {
                $query->select('*');
                //TODO: add community filter
                $query->where('community_id', 1);
            }
        ])
            ->where('organization_id', $orgId)
            ->orderBy('id', 'ASC')
            ->get();


        return $user;
    }
}
