<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h2>{{ $book->title }}</h2>
    <p>by {{ $book->authors }}</p>
    <p><strong>Kategori:</strong> {{ $book->categories }}</p>
    <p><strong>År:</strong> {{ $book->published_year }}</p>
    <p><strong>Sidor:</strong> {{ $book->num_pages }}</p>
    <p><strong>Beskrivning:</strong> {{ $book->description }}</p>
    <button onclick="location.href='/'">Tillbaka</button>
</body>
</html>
