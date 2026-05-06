const jadwalModel = require('../models/jadwalModel');

exports.booking = (req, res) => {
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
    VALUES (?,?,?,?,?, 'booked')`,
    [lapangan_id, req.user.id, tanggal, jm, js],
    (err) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Booking berhasil" });
    }
  );
};