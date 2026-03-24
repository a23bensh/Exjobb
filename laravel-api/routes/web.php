<?php

use Illuminate\Support\Facades\Route;

Route::get('/startsida', function(){
    return redirect('/');
});

Route::get('/', function () {
    return view('phpversion');
});

Route::get('/books/{id}', [App\Http\Controllers\BookController::class, 'details']);
