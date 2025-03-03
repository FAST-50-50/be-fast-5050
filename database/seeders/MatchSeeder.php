<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('matches')->insert([
            [
                'sport_id' => 1,
                'community_id' => 1,
                'name' => 'Jornada 24',
                'description' => 'A friendly football game for community members.',
                'poster' => 'posters/football_sunday.jpg',
                'game_type' => 'Internal 11v11',
                'venue' => 'Mengger Soccer',
                'address' => 'Jl. Mengger Hilir No.121C, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung',
                'location_link' => 'https://g.co/kgs/v6MqiWi',
                'date' => '2025-02-20',
                'time' => '18:15:00',
                'with_fg' => true,
                'with_vg' => false,
                'with_referee' => true,
                'with_linesman' => false,
                'max_players' => 44,
                'min_players' => 33,
                'price' => 80000,
                'social_link' => json_encode([
                    'whatsapp' => 'https://chat.whatsapp.com/example',
                    'telegram' => 'https://t.me/examplegroup'
                ]),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
