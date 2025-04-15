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
            [
                'name' => 'BADMINTON',
                'description' => 'Badminton & Bulu Tangkis',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'VOLLEYBALL',
                'description' => 'Voli & Bola Voli',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'TABLE TENNIS',
                'description' => 'Ping Pong & Tenis Meja',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'SWIMMING',
                'description' => 'Renang & Kolam Renang',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'RUNNING',
                'description' => 'Lari & Jogging',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'CYCLING',
                'description' => 'Bersepeda & Gowes',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'GOLF',
                'description' => 'Golf & Driving Range',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'YOGA',
                'description' => 'Yoga & Meditasi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'BOXING',
                'description' => 'Tinju & Kickboxing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MARTIAL ARTS',
                'description' => 'Bela Diri & Pencak Silat',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'DANCE',
                'description' => 'Tari & Zumba',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'CLIMBING',
                'description' => 'Panjat Tebing & Rock Climbing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'SKATEBOARDING',
                'description' => 'Skateboard & Roller Skate',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ARCHERY',
                'description' => 'Panahan & Memanah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'FITNESS',
                'description' => 'Gym & Latihan Beban',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'CROSSFIT',
                'description' => 'Crossfit & Functional Training',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'PILATES',
                'description' => 'Pilates & Core Training',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
