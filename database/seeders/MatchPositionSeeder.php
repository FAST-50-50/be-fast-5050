<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MatchPosition;

class MatchPositionSeeder extends Seeder
{
    public function run()
    {
        MatchPosition::insert([
            ['match_id' => 1, 'position' => 'GK', 'quota' => 4],
            ['match_id' => 1, 'position' => 'CB', 'quota' => 12],
            ['match_id' => 1, 'position' => 'CM', 'quota' => 16],
            ['match_id' => 1, 'position' => 'CF', 'quota' => 12],
        ]);
    }
}
