const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(express.static('public'));


const db = new sqlite3.Database('./mi_base_de_datos.db');


db.run(`CREATE TABLE IF NOT EXISTS Publicaciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  contenido TEXT,
  estado TEXT DEFAULT 'borrador'
)`);


app.get('/publicaciones', (req, res) => {
  db.all('SELECT * FROM Publicaciones WHERE estado = "publicado"', (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(rows);
  });
});


app.post('/publicaciones', (req, res) => {
  const { titulo, contenido } = req.body;
  db.run('INSERT INTO Publicaciones (titulo, contenido) VALUES (?, ?)', [titulo, contenido], function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: this.lastID, titulo, contenido });
  });
});


app.put('/publicaciones/:id', (req, res) => {
  const { titulo, contenido } = req.body;
  db.run('UPDATE Publicaciones SET titulo = ?, contenido = ? WHERE id = ?', [titulo, contenido, req.params.id], function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: req.params.id, titulo, contenido });
  });
});


app.delete('/publicaciones/:id', (req, res) => {
  db.run('DELETE FROM Publicaciones WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(204).send();
  });
});


app.put('/publicaciones/:id/publicar', (req, res) => {
  db.run('UPDATE Publicaciones SET estado = "publicado" WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id: req.params.id, estado: 'publicado' });
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
