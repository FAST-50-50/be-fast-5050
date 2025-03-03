<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;



class UserController extends Controller
{
    public function index(): Response
    {
        $user = new User();
        $members = $user->selectAllMembers(config('app.org_id'));
   
        return Inertia::render('Member/MemberPage', [
            'members' => $members,
        ]);
    }
}
