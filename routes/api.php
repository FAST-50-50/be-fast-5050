<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\MatchController;
use App\Http\Middleware\VerifyOrganization;
use App\Http\Middleware\VerifyUserOrganization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;


// PUBLIC API
Route::withoutMiddleware([VerifyUserOrganization::class])->group(function () {
    Route::post('/import-csv-member', [UserController::class, 'importCSVMember']);
});


Route::post('/login', [UserController::class, 'login'])->middleware([VerifyOrganization::class])->withoutMiddleware([VerifyUserOrganization::class]);

Route::middleware(['auth:sanctum', VerifyUserOrganization::class])->group(function () {
    // USER
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);

    // MATCH
    Route::get('/matches', [MatchController::class, 'index']);
});


Route::post('/notifly', function (Request $request) {
    $logFile = storage_path('logs/notifly.txt');

    $requestData = json_encode($request->all(), JSON_PRETTY_PRINT);
    File::append($logFile, now() . " - " . $requestData . PHP_EOL . PHP_EOL);

    return response()->json(['message' => 'Request logged']);
});
