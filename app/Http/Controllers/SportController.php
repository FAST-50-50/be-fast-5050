<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SportController extends Controller
{
    public function index()
    {
        $sports = Sport::all();
        return Inertia::render('Sports/Index', [
            'sports' => $sports
        ]);
    }

    public function create()
    {
        return Inertia::render('Sports/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
        ]);

        Sport::create($validated);

        return redirect()->route('sports.index');
    }

    public function edit(Sport $sport)
    {
        return Inertia::render('Sports/Edit', [
            'sport' => $sport
        ]);
    }

    public function update(Request $request, Sport $sport)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:255',
        ]);

        $sport->update($validated);

        return redirect()->route('sports.index');
    }

    public function destroy(Sport $sport)
    {
        $sport->delete();
        return redirect()->route('sports.index');
    }
} 