const db = require('../config/db');

exports.createBooking = (data, callback) => {
  const { lapangan_id, user_id, tanggal, jam_mulai, jam_selesai } = data;

  db.query(
    `INSERT INTO jadwal 
    (lapangan_id,user_id,tanggal,jam_mulai,jam_selesai)
    VALUES (?,?,?,?,?)`,
    [lapangan_id, user_id, tanggal, jam_mulai, jam_selesai],
    callback
  );
};