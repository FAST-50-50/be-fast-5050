<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;



class UserController extends Controller
{
    public function index(): Response
    {
        $user = new User();
        $members = $user->selectAllUsers();

        return Inertia::render('Member/MemberPage', [
            'members' => $members,
        ]);
    }
}
