const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

/* GET ALL USERS (ADMIN) */
router.get('/', auth(['admin']), (req, res) => {
  db.query('SELECT id, username, role FROM users', (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

/* UPDATE USER */
router.put('/:id', auth(['admin']), (req, res) => {
  const { username, role } = req.body;

  db.query(
    'UPDATE users SET username=?, role=? WHERE id=?',
    [username, role, req.params.id],
    () => res.send('User diupdate')
  );
});

/* DELETE USER */
router.delete('/:id', auth(['admin']), (req, res) => {
  db.query(
    'DELETE FROM users WHERE id=?',
    [req.params.id],
    () => res.send('User dihapus')
  );
});

module.exports = router;