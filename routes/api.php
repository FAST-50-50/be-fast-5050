<?php

use App\Http\Controllers\API\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;


Route::post('/login', [UserController::class, 'login']);

// members
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user/{id}', [UserController::class, 'show']);



Route::post('/import-csv-member', [UserController::class, 'importCSVMember']);

Route::post('/notifly', function (Request $request) {
    $logFile = storage_path('logs/notifly.txt');

    $requestData = json_encode($request->all(), JSON_PRETTY_PRINT);
    File::append($logFile, now() . " - " . $requestData . PHP_EOL . PHP_EOL);

    return response()->json(['message' => 'Request logged']);
});
