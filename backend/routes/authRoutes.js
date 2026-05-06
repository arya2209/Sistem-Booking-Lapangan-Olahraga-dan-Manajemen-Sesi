const express = require('express');
const router = express.Router();
const db = require('../config/db');

const authController = require('../controllers/authController');

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, 'member'],
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