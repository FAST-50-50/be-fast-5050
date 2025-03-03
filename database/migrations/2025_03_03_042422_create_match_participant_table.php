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
        Schema::create('match_participant', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->index();
            $table->foreignId('match_id')->nullable()->index();
            $table->string('position', 50);
            $table->string('team', 50)->nullable();
            $table->double('team_rank', 1)->nullable();
            $table->double('goal', 2)->nullable();
            $table->double('assist', 2)->nullable();
            $table->double('clean_sheet', 2)->nullable();
            $table->double('rating', 2)->nullable();
            $table->string('status', 50)->nullable(); // JOINED, PAID, CANCELED
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('match_participant');
    }
};
