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

    public function show(Request $request, $id)
    {
        $user = $request->user();
        $match = Matches::getMatchDetail($id);
        //add join detail, if user already joined
        if ($user) {
            $isAlreadyJoined = MatchParticipant::isAlreadyJoined($user->id, $id);
            if ($isAlreadyJoined) {
                // add join detail from match_participant
                $match->join_detail = MatchParticipant::getJoinDetail($user->id, $id);
            }
        }


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

    public function cancel(Request $request, $id)
    {
        $user = $request->user();
        $matchParticipant = MatchParticipant::find($id);
        if (!$matchParticipant) {
            return ApiResponse::send(false, 'You havent join to this match yet', null, 404);
        }
        if ($matchParticipant->user_id != $user->id) {
            return ApiResponse::send(false, 'You are not allowed to cancel this match', null, 403);
        }
        $cancel = MatchParticipant::cancelMatch($id);
        if ($cancel) {
            // SUCCESS Response
            return ApiResponse::send(true, 'Successfully canceled the match', null);
        } else {
            return ApiResponse::send(false, 'Failed to cancel the match', null, 400);
        }
    }
}
