<?php

namespace App\Http\Controllers;

use App\Models\MatchParticipant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchParticipantController extends Controller
{
    public function update(Request $request, $matchId, $participantId)
    {
        $participant = MatchParticipant::where('match_id', $matchId)
            ->where('id', $participantId)
            ->firstOrFail();

        $request->validate([
            'status' => 'required|in:JOINED,PENDING,CANCELED',
        ]);

        $participant->update([
            'status' => $request->status,
        ]);

        return back();
    }
} 