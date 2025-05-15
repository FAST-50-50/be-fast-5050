<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Models\Matches;
use App\Http\Controllers\Controller;
use App\Models\MatchParticipant;
use Illuminate\Http\Request;

class MatchController extends Controller
{

    public function index(Request $request)
    {
        $communityId = $request->get('community_id');
        $match = new Matches();
        $matches = $match::allMatches($communityId);

        return ApiResponse::send(true, 'Matches list retrieved', $matches);
    }

    public function show($id)
    {
        $match = Matches::getMatchDetail($id);

        if (!$match) {
            return ApiResponse::send(false, 'Match not found', null, 404);
        }

        return ApiResponse::send(true, 'Match details retrieved', $match);
    }

    public function join(Request $request, $id)
    {
        $user = $request->user();
        $position = $request->get('position');

        $match = Matches::find($id);

        if (!$match) {
            return ApiResponse::send(false, 'Match not found', null, 404);
        }

        $isAlreadyJoined = MatchParticipant::isAlreadyJoined($user->id, $id);
        if ($isAlreadyJoined) {
            return ApiResponse::send(false, 'You have already joined this match', null, 400);
        }

        $join = MatchParticipant::joinMatch($user->id, $id, $position);
        if (!$join) {
            return ApiResponse::send(false, 'Failed to join the match', null, 400);
        }


        if ($join) {
            // SUCCESS Response
            return ApiResponse::send(true, 'Successfully joined the match', $match);
        } else {
            return ApiResponse::send(false, 'Failed to join the match', null, 400);
        }
    }
}
