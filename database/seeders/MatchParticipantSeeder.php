<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MatchParticipant;

class MatchParticipantSeeder extends Seeder
{
    public function run()
    {
        MatchParticipant::insert([
            [
                'user_id' => 1,
                'match_id' => 1,
                'position' => 'GK',
                'status' => 'JOINED',
            ],
            [
                'user_id' => 2,
                'match_id' => 1,
                'position' => 'CB',
                'status' => 'PAID',
            ],
        ]);
    }
}
