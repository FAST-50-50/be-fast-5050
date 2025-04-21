<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use App\Models\Sport;
use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MatchController extends Controller
{
    public function index(): Response
    {
        $matches = Matches::with(['community', 'matchPositions', 'matchParticipant'])->get()
            ->map(function ($match) {
                return [
                    'id' => $match->id,
                    'name' => $match->name,
                    'description' => $match->description,
                    'poster' => $match->poster,
                    'game_type' => $match->game_type,
                    'venue' => $match->venue,
                    'date' => $match->date,
                    'time' => $match->time,
                    'max_players' => $match->max_players,
                    'min_players' => $match->min_players,
                    'price' => $match->price,
                    'community' => $match->community ? [
                        'id' => $match->community->id,
                        'name' => $match->community->name,
                        'sport' => $match->community->sport ? [
                            'id' => $match->community->sport->id,
                            'name' => $match->community->sport->name,
                        ] : null,
                    ] : null,
                    'positions' => $match->matchPositions->map(function ($position) {
                        return [
                            'position' => $position->position,
                            'quota' => $position->quota,
                        ];
                    }),
                    'participants' => $match->matchParticipant->count(),
                ];
            });

        return Inertia::render('Matches/Index', [
            'matches' => $matches,
        ]);
    }

    public function create(): Response
    {
        $communities = Community::with('sport')->select('id', 'name', 'sport_id')->get();

        return Inertia::render('Matches/Create', [
            'communities' => $communities,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'community_id' => 'required|exists:communities,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'poster' => 'required|string',
            'game_type' => 'required|string|max:255',
            'venue' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'location_link' => 'required|string|max:100',
            'date' => 'required|date',
            'time' => 'required',
            'with_fg' => 'required|boolean',
            'with_vg' => 'required|boolean',
            'with_referee' => 'required|boolean',
            'with_linesman' => 'required|boolean',
            'max_players' => 'required|integer',
            'min_players' => 'required|integer',
            'price' => 'required|integer',
            'social_link' => 'required|array',
            'positions' => 'required|array',
            'positions.*.position' => 'required|string',
            'positions.*.quota' => 'required|integer',
        ]);

        $match = Matches::create($validated);

        foreach ($validated['positions'] as $position) {
            $match->matchPositions()->create([
                'position' => $position['position'],
                'quota' => $position['quota'],
            ]);
        }

        return redirect()->route('matches.index');
    }

    public function edit(Matches $match): Response
    {
        $communities = Community::with('sport')->select('id', 'name', 'sport_id')->get();
        $match->load(['matchPositions']);

        return Inertia::render('Matches/Edit', [
            'match' => $match,
            'communities' => $communities,
        ]);
    }

    public function update(Request $request, Matches $match)
    {
        $validated = $request->validate([
            'community_id' => 'required|exists:communities,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
            'poster' => 'required|string',
            'game_type' => 'required|string|max:255',
            'venue' => 'required|string|max:100',
            'address' => 'required|string|max:100',
            'location_link' => 'required|string|max:100',
            'date' => 'required|date',
            'time' => 'required',
            'with_fg' => 'required|boolean',
            'with_vg' => 'required|boolean',
            'with_referee' => 'required|boolean',
            'with_linesman' => 'required|boolean',
            'max_players' => 'required|integer',
            'min_players' => 'required|integer',
            'price' => 'required|integer',
            'social_link' => 'required|array',
            'positions' => 'required|array',
            'positions.*.position' => 'required|string',
            'positions.*.quota' => 'required|integer',
        ]);

        $match->update($validated);

        // Update positions
        $match->matchPositions()->delete();
        foreach ($validated['positions'] as $position) {
            $match->matchPositions()->create([
                'position' => $position['position'],
                'quota' => $position['quota'],
            ]);
        }

        return redirect()->route('matches.index');
    }

    public function destroy(Matches $match)
    {
        $match->delete();
        return redirect()->route('matches.index');
    }

    public function show(Matches $match): Response
    {
        $match->load(['community.sport', 'matchPositions', 'matchParticipant']);

        return Inertia::render('Matches/Show', [
            'match' => [
                'id' => $match->id,
                'name' => $match->name,
                'description' => $match->description,
                'poster' => $match->poster,
                'game_type' => $match->game_type,
                'venue' => $match->venue,
                'address' => $match->address,
                'location_link' => $match->location_link,
                'date' => $match->date,
                'time' => $match->time,
                'with_fg' => $match->with_fg,
                'with_vg' => $match->with_vg,
                'with_referee' => $match->with_referee,
                'with_linesman' => $match->with_linesman,
                'max_players' => $match->max_players,
                'min_players' => $match->min_players,
                'price' => $match->price,
                'social_link' => $match->social_link,
                'community' => $match->community ? [
                    'id' => $match->community->id,
                    'name' => $match->community->name,
                    'sport' => $match->community->sport ? [
                        'id' => $match->community->sport->id,
                        'name' => $match->community->sport->name,
                    ] : null,
                ] : null,
                'positions' => $match->matchPositions->map(function ($position) {
                    return [
                        'position' => $position->position,
                        'quota' => $position->quota,
                    ];
                }),
                'participants' => $match->matchParticipant->count(),
            ],
        ]);
    }
} 