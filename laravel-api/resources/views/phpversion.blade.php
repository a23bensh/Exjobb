<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel version</title>
</head>
<body>

    <button onclick="location.href='http://localhost/Examensarbete'">Startsida</button>
    <button onclick="location.href='/api/books'">Visa alla böcker</button>

    <h2>Sök efter böcker</h2>
    <input type="text" id="searchbar" placeholder="Sök titel eller författare...">
    <button onclick="search()">Sök</button>

    <div id="results"></div>

    <script>
        function search() {
            const term = document.getElementById('searchbar').value;
            fetch(`/api/books/search?q=${term}`)
                .then(res => res.json())
                .then(books => {
                    const div = document.getElementById('results');
                    div.innerHTML = '';
                    books.forEach(book => {
                        div.innerHTML += `
                            <p>
                                <a href="/books/${book.id}"><strong>${book.title}</strong></a><br>
                                by ${book.authors}
                            </p>
                        `;
                    });
                });
        }
    </script>

</body>
</html>