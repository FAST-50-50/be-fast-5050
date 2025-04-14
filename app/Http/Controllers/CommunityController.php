<?php

namespace App\Http\Controllers;

use App\Models\Community;
use App\Models\Organization;
use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    public function index(): Response
    {
        $communities = Community::with(['organization', 'sport', 'userCommunities'])->get()
            ->map(function ($community) {
                return [
                    'id' => $community->id,
                    'name' => $community->name,
                    'logo' => $community->logo,
                    'contact' => $community->contact,
                    'contact_wa' => 'https://wa.me/' . preg_replace('/[^0-9]/', '', $community->contact),
                    'ig' => $community->ig,
                    'ig_link' => 'https://instagram.com/' . ltrim($community->ig, '@'),
                    'organization_name' => $community->organization->name,
                    'member_count' => $community->userCommunities->count(),
                ];
            });

        return Inertia::render('Communities/Index', [
            'communities' => $communities,
        ]);
    }

    public function create(): Response
    {
        $organizations = Organization::select('id', 'name')->get();
        $sports = Sport::select('id', 'name')->get();

        return Inertia::render('Communities/Create', [
            'organizations' => $organizations,
            'sports' => $sports,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'logo' => 'required|string',
            'contact' => 'required|string',
            'ig' => 'required|string',
            'organization_id' => 'required|exists:organizations,id',
            'sport_id' => 'required|exists:sports,id',
        ]);

        Community::create($validated);

        return redirect()->route('communities.index');
    }

    public function edit(Community $community): Response
    {
        $organizations = Organization::select('id', 'name')->get();
        $sports = Sport::select('id', 'name')->get();

        return Inertia::render('Communities/Edit', [
            'community' => $community->load(['organization', 'sport']),
            'organizations' => $organizations,
            'sports' => $sports,
        ]);
    }

    public function update(Request $request, Community $community)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'logo' => 'required|string',
            'contact' => 'required|string',
            'ig' => 'required|string',
            'organization_id' => 'required|exists:organizations,id',
            'sport_id' => 'required|exists:sports,id',
        ]);

        $community->update($validated);

        return redirect()->route('communities.index');
    }

    public function destroy(Community $community)
    {
        $community->delete();

        return redirect()->route('communities.index');
    }
} 