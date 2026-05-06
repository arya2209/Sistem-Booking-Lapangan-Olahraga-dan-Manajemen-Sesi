const express = require('express');
const router = express.Router();

const db = require('../config/db');
const auth = require('../middleware/auth');


router.post('/', auth(['member']), (req, res) => {
  const { lapangan_id, tanggal, jam_mulai, jam_selesai } = req.body;

  console.log("BODY:", req.body);
  console.log("USER:", req.user);

  if (!lapangan_id || !tanggal || !jam_mulai || !jam_selesai) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const jm = jam_mulai + ":00";
  const js = jam_selesai + ":00";

  db.query(
    `INSERT INTO jadwal 
    (lapangan_id,user_id,tanggal,jam_mulai,jam_selesai,status) 
    VALUES (?,?,?,?,?,'booked')`,
    [lapangan_id, req.user.id, tanggal, jm, js],
    (err) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Booking berhasil" });
    }
  );
});

router.get('/my', auth(['member']), (req, res) => {
  console.log("USER LOGIN:", req.user);

  db.query(
    'SELECT * FROM jadwal WHERE user_id=?',
    [req.user.id],
    (err, result) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json(err);
      }

      console.log("DATA:", result);

      res.json(result);
    }
  );
});

module.exports = router;