const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt'); // 🔥 TAMBAH INI

const authController = require('../controllers/authController');

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, 'member'], // 🔥 GANTI DI SINI
      (err) => {
        if (err) return next(err);
        res.send('Register berhasil');
      }
    );

  } catch (err) {
    next(err);
  }
});

router.post('/login', authController.login);

module.exports = router;