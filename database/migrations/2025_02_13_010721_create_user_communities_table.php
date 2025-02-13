<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_communities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->index();
            $table->foreignId('community_id')->nullable()->index();
            $table->string('joined_since')->nullable()->comment('Year they started playing with FAST 50:50');
            $table->integer('total_matches')->nullable()->comment('Estimated number of matches played with FAST 50:50');
            $table->string('preferred_positions', 255)->comment('Preferred playing positions (minimum 2, except goalkeeper)');
            $table->string('favorite_position', 50)->comment('Most favorite playing position');
            $table->string('least_favorite_position', 50)->nullable()->comment('Least favorite position (can be empty if willing to play anywhere)');
            $table->string('game_types', 255)->nullable()->comment('Types of games they want to join');
            $table->string('favorite_team', 255)->nullable()->comment('Favorite football team (local and/or international)');
            $table->enum('experience_level', ['Club', 'League', 'Pro', 'Elite'])->comment('Self-rated playing experience level');
            $table->string('owned_jerseys', 255)->nullable()->comment('FAST 50:50 jerseys they already have');
            $table->string('photo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_community');
    }
};
