<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Community;
use App\Models\UserCommunity;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->get('organization')->id;

        // Get authenticated user if token exists
        $user = null;
        if ($request->bearerToken()) {
            $user = auth('sanctum')->user();
        }

        $communities = Community::with(['organization', 'sport', 'userCommunities'])
            ->where('organization_id', $orgId)
            ->get()
            ->map(function ($community) use ($user) {
                $isMyCommunity = null;
                if ($user) {
                    $isMyCommunity = $community->userCommunities->contains('user_id', $user->id);
                }

                return [
                    'id' => $community->id,
                    'name' => $community->name,
                    'description' => $community->description,
                    'logo' => $community->logo,
                    'contact' => $community->contact,
                    'contact_wa' => 'https://wa.me/' . preg_replace('/[^0-9]/', '', $community->contact),
                    'ig' => $community->ig,
                    'ig_link' => 'https://instagram.com/' . ltrim($community->ig, '@'),
                    'organization_name' => $community->organization->name,
                    'member_count' => $community->userCommunities->count(),
                    'sport' => $community->sport ? [
                        'id' => $community->sport->id,
                        'name' => $community->sport->name,
                    ] : null,
                    'is_my_community' => $isMyCommunity,
                ];
            });

        return ApiResponse::send(true, 'Communities retrieved successfully', $communities);
    }

    public function join(Request $request, Community $community)
    {
        $user = $request->user();
        
        // Check if user is already a member
        if ($community->userCommunities->contains('user_id', $user->id)) {
            return ApiResponse::send(false, 'You are already a member of this community', null, 400);
        }

        // Create new user community relationship
        $userCommunity = new UserCommunity([
            'user_id' => $user->id,
            'community_id' => $community->id,
            'joined_since' => now(),
            'experience_level' => 'beginner', // Default value, can be updated later
        ]);

        $userCommunity->save();

        return ApiResponse::send(true, 'Successfully joined the community', $userCommunity);
    }
}
