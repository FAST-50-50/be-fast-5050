<?php

namespace App\Http\Controllers;

use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    public function index(): Response
    {
        $communities = Community::all();

        return Inertia::render('Communities/Index', [
            'communities' => $communities,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Communities/Create');
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
        return Inertia::render('Communities/Edit', [
            'community' => $community,
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