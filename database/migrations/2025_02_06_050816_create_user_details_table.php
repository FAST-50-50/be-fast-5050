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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id()->comment('Primary key, unique ID for each registration');
            $table->foreignId('user_id')->nullable()->index();
            $table->string('fullname', 255)->comment('Full name of the player');
            $table->string('nickname', 100)->nullable()->comment('Nickname for familiarity');
            $table->string('birth_year')->nullable()->comment('Year of birth for team division considerations');
            $table->string('wa', 20)->nullable()->comment('WhatsApp number for communication');
            $table->string('ig', 100)->nullable()->comment('Instagram handle to check if they follow fast5050bandung');
            $table->jsonb('telu_relation')->nullable()->comment('Relationship with Telkom University');
            $table->string('photo', 255)->nullable()->comment('Uploaded close-up photo (optional)');
            $table->jsonb('skills')->nullable()->comment('Skills & contributions they can offer to FAST 50:50');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};
