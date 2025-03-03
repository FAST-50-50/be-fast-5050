<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Models\Matches;
use App\Http\Controllers\Controller;
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
}
