<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyOrganization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $orgKey = $request->header('ORG_KEY');

        // Check if the ORG_KEY exists
        $organization = Organization::where('key', $orgKey)->first();

        if (!$organization) {
            return response()->json([
                'message' => 'Unauthorized: Missing or invalid Organization',
            ], 403);
        }

        $request->merge(['organization' => $organization]);
        return $next($request);
    }
}
