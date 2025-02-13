<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganizationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('organizations')->insert([
            [
                'key' => 'BismillahKunci', // Generates a unique key
                'name' => 'TelU',
                'description' => 'Telkom University',
                'address' => 'Jalan Telekomunikasi, Bandung',
                'phone' => '+628112284854',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'BismillahKey',
                'name' => 'UIN',
                'description' => 'Universitas Islam Negri Bandung',
                'address' => 'Jalan Seokarno Hatta',
                'phone' => '+628112284811',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
