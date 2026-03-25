const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Skapa en anslutning till MySQL-databasen
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'exjobbdb'
});

// Anslut till databasen
connection.connect((err) => {
  if (err) {
    console.error('Fel vid anslutning till databasen:', err);
    return;
  } 
  console.log('Ansluten till MySQL-databasen!');
});

// Route till index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Hämta alla böcker
app.get('/api/books', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Databasfel' });
      return;
    }
    res.json(results);
  });
});

// Sökendpoint
app.get('/api/books/search', (req, res) => {
  const searchTerm = req.query.q || '';
  const query = 'SELECT * FROM books WHERE title LIKE ? OR authors LIKE ?';
  
  connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Databasfel' });
      return;
    }
    res.json(results);
  });
});

// Bokdetaljer
app.get('/books/:id', (req, res) => {
  connection.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      res.send('Bok hittades inte');
      return;
    }
    const book = results[0];
    res.send(`
      <html>
        <body>
          <h2>${book.title}</h2>
          <p>by ${book.authors}</p>
          <p><strong>Category:</strong> ${book.categories}</p>
          <p><strong>Year:</strong> ${book.published_year}</p>
          <p><strong>Pages:</strong> ${book.num_pages}</p>
          <p><strong>Description:</strong> ${book.description}</p>
          <button onclick="location.href='/'">Tillbaka</button>
        </body>
      </html>
    `);
  });
});

// Hämta en bok via id
app.get('/api/books/:id', (req, res) => {
  connection.query('SELECT * FROM books WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      res.status(404).json({ error: 'Bok hittades inte' });
      return;
    }
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});