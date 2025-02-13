<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SportsTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('sports')->insert([
            [
                'name' => 'FOOTBALL', 
                'description' => 'Futsal, Minisoccer & Sepak Bola',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'TENNIS',
                'description' => 'Tennis Manja',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'BASKET',
                'description' => 'Bola basket Jokic',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
