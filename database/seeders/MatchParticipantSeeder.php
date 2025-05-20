<?php

namespace Database\Seeders;

use App\Models\MatchParticipant;
use App\Models\Matches;
use App\Models\User;
use Illuminate\Database\Seeder;

class MatchParticipantSeeder extends Seeder
{
    public function run(): void
    {
        $matches = Matches::with('positions')->get();
        $users = User::all();
        $statuses = ['JOINED', 'PENDING', 'CANCELED'];

        foreach ($matches as $match) {
            // Get random positions from the match
            $positions = $match->positions->pluck('position')->toArray();
            
            if (empty($positions)) {
                // If no positions are defined, use some default positions
                $positions = ['GK', 'CB', 'LB', 'RB', 'CM', 'LW', 'RW', 'ST'];
            }

            // Create 30 participants for each match
            for ($i = 0; $i < 30; $i++) {
                $randomUser = $users->random();
                $randomPosition = $positions[array_rand($positions)];
                $randomStatus = $statuses[array_rand($statuses)];

                MatchParticipant::create([
                    'match_id' => $match->id,
                    'user_id' => $randomUser->id,
                    'position' => $randomPosition,
                    'status' => $randomStatus,
                ]);
            }
        }
    }
}
