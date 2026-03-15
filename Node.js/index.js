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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});