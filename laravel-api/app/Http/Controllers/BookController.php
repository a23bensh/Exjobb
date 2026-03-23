<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // Hämta alla böcker
        public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    // Hämta en specifik bok baserat på ID
    public function show($id)
    {
        $book = Book::find($id);
        if ($book) {
            return response()->json($book);
        } else {
            return response()->json(['message' => 'Bok hittades inte'], 404);
        }
    }

    // Sök efter böcker baserat på titel eller författare
    public function search(Request $request)
    {
        $searchTerm = $request->query('q', '');
        $books = Book::where('title', 'like', "%{$searchTerm}%")
            ->orWhere('authors', 'like', "%{$searchTerm}%")
            ->get();
        return response()->json($books);
    }
}
