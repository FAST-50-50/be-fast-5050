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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_id')->nullable()->index();
            $table->foreignId('community_id')->nullable()->index();
            $table->string('name', 100);
            $table->string('description', 255);
            $table->string('poster', 255);
            $table->string('game_type', 255);
            $table->string('venue', 100);
            $table->string('address', 100);
            $table->string('location_link', 100);
            $table->date('date');
            $table->time('time');
            $table->boolean('with_fg');
            $table->boolean('with_vg');
            $table->boolean('with_referee');
            $table->boolean('with_linesman');
            $table->integer('max_players');
            $table->integer('min_players');
            $table->integer('price');
            $table->jsonb('social_link');
            $table->enum('experience_level', ['Club', 'League', 'Pro', 'Elite'])->comment('Self-rated playing experience level');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
