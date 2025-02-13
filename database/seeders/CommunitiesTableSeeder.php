<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommunitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('communities')->insert([
            [
                'organization_id' => 1,
                'sport_id' => 1,
                'name' => 'FAST 50:50',
                'description' => 'FAST 50:50',
                'logo' => 'https://i.ibb.co.com/Y40sNy8q/Official-Logo.png',
                'contact' => '+628112284854',
                'ig' => '@fast5050bandung',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'organization_id' => 1,
                'sport_id' => 2,
                'name' => 'TelU Tennis Club',
                'description' => 'TelU Tennis Club',
                'logo' => 'https://i.ibb.co.com/7xMMDr71/Screenshot-2025-02-13-at-08-52-56.png',
                'contact' => '+6282218325622',
                'ig' => '@telkomtennisclub',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'organization_id' => 2,
                'sport_id' => 1,
                'name' => 'UIN SGD Football',
                'description' => 'UIN SGD Football',
                'logo' => 'https://i.ibb.co.com/gLzN0Syk/Screenshot-2025-02-13-at-08-54-45.png',
                'contact' => '+6282218325612',
                'ig' => '@uinsgd.football',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
