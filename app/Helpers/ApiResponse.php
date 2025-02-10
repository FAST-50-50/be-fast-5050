<?php

namespace App\Helpers;

class ApiResponse
{
    /**
     * Format the API response
     *
     * @param bool $success
     * @param string $message
     * @param mixed $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function send($success, $message, $data = null)
    {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ]);
    }
}
