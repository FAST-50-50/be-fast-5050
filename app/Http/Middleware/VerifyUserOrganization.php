<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyUserOrganization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $orgKey = $request->header('ORG_KEY');
        $userId = $request->user()->id;

        // Check if the ORG_KEY exists
        $organization = Organization::where('key', $orgKey)->first();

        if (!$organization) {
            return response()->json([
                'message' => 'Unauthorized: Missing or invalid Organization',
            ], 403);
        } else {
            $isValidUserInOrg = User::where('organization_id', $organization->id)->where('id', $userId)->exists();
            if (!$isValidUserInOrg) {
                return response()->json([
                    'message' => 'Unauthorized: User not in Organization',
                ], 403);
            }
        }

        $request->merge(['organization' => $organization]);
        return $next($request);
    }
}
