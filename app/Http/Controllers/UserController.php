<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Community;
use App\Models\UserDetail;
use App\Models\UserCommunity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $user = new User();
        $members = $user->selectAllMembers(config('app.org_id'));
        $communities = Community::where('organization_id', config('app.org_id'))
            ->select('id', 'name')
            ->get();

        return Inertia::render('Member/MemberPage', [
            'members' => $members,
            'communities' => $communities,
        ]);
    }

    public function create(): Response
    {
        $communities = Community::where('organization_id', config('app.org_id'))
            ->select('id', 'name')
            ->get();

        return Inertia::render('Member/Create', [
            'communities' => $communities,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'fullname' => 'required|string|max:255',
            'wa' => 'required|string|max:255',
            'ig' => 'required|string|max:255',
            'favorite_position' => 'required|string|max:255',
            'experience_level' => 'required|string|max:255',
            'community_ids' => 'required|array',
            'community_ids.*' => 'exists:communities,id',
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'organization_id' => config('app.org_id'),
            'password' => Hash::make($validated['username']),
        ]);

        UserDetail::create([
            'user_id' => $user->id,
            'fullname' => $validated['fullname'],
            'wa' => $validated['wa'],
            'ig' => $validated['ig'],
        ]);

        foreach ($validated['community_ids'] as $communityId) {
            UserCommunity::create([
                'user_id' => $user->id,
                'community_id' => $communityId,
                'favorite_position' => $validated['favorite_position'],
                'experience_level' => $validated['experience_level'],
            ]);
        }

        return redirect()->route('members.index');
    }

    public function edit(User $member): Response
    {
        $communities = Community::where('organization_id', config('app.org_id'))
            ->select('id', 'name')
            ->get();

        return Inertia::render('Member/Edit', [
            'member' => $member->load(['userDetail', 'userCommunity', 'communities']),
            'communities' => $communities,
        ]);
    }

    public function update(Request $request, User $member)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $member->id,
            'fullname' => 'required|string|max:255',
            'wa' => 'required|string|max:255',
            'ig' => 'required|string|max:255',
            'favorite_position' => 'required|string|max:255',
            'experience_level' => 'required|string|max:255',
            'community_ids' => 'required|array',
            'community_ids.*' => 'exists:communities,id',
        ]);

        $member->update([
            'username' => $validated['username'],
        ]);

        $member->userDetail->update([
            'fullname' => $validated['fullname'],
            'wa' => $validated['wa'],
            'ig' => $validated['ig'],
        ]);

        // Delete existing user communities
        $member->userCommunity()->delete();

        // Create new user communities
        foreach ($validated['community_ids'] as $communityId) {
            UserCommunity::create([
                'user_id' => $member->id,
                'community_id' => $communityId,
                'favorite_position' => $validated['favorite_position'],
                'experience_level' => $validated['experience_level'],
            ]);
        }

        return redirect()->route('members.index');
    }

    public function destroy(User $member)
    {
        $member->delete();
        return redirect()->route('members.index');
    }
}
