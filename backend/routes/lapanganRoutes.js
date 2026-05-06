const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

/* CREATE */
router.post('/', auth(['admin']), (req, res) => {
  const { nama, lokasi, harga_per_jam } = req.body;

  db.query(
    'INSERT INTO lapangan (nama,lokasi,harga_per_jam) VALUES (?,?,?)',
    [nama, lokasi, harga_per_jam],
    (err) => {
      if (err) return res.send(err);
      res.send('Lapangan ditambah');
    }
  );
});

/* READ */
router.get('/', (req, res) => {
  db.query('SELECT * FROM lapangan', (err, result) => {
    res.json(result);
  });
});

/* UPDATE */
router.put('/:id', auth(['admin']), (req, res) => {
  const { nama, lokasi, harga_per_jam } = req.body;

  db.query(
    'UPDATE lapangan SET nama=?, lokasi=?, harga_per_jam=? WHERE id=?',
    [nama, lokasi, harga_per_jam, req.params.id],
    () => res.send('Lapangan diupdate')
  );
});

/* DELETE */
router.delete('/:id', auth(['admin']), (req, res) => {
  db.query(
    'DELETE FROM lapangan WHERE id=?',
    [req.params.id],
    () => res.send('Lapangan dihapus')
  );
});

module.exports = router;