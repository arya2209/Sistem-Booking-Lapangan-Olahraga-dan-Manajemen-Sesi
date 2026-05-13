const express = require("express");
const router = express.Router();

const db = require("../config/db");
const auth = require("../middleware/auth");

router.post("/", auth(["member"]), (req, res) => {
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
    },
  );
});

router.get("/my", auth(["member"]), (req, res) => {
  console.log("USER LOGIN:", req.user);

  db.query(
    "SELECT * FROM jadwal WHERE user_id=?",
    [req.user.id],
    (err, result) => {
      if (err) {
        console.log("ERROR DB:", err);
        return res.status(500).json(err);
      }

      console.log("DATA:", result);

      res.json(result);
    },
  );
});

// okupansi lapangan
router.get("/okupansi", (req, res) => {
  db.query(
    `SELECT lapangan_id, COUNT(*) as total
     FROM jadwal
     GROUP BY lapangan_id`,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    },
  );
});

// peak hour
router.get("/peak-hour", (req, res) => {
  db.query(
    `SELECT jam_mulai, COUNT(*) as total
     FROM jadwal
     GROUP BY jam_mulai
     ORDER BY total DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    },
  );
});

// pembatalan
router.get("/pembatalan", (req, res) => {
  db.query(
    `SELECT tanggal, COUNT(*) as total
     FROM jadwal
     WHERE status='cancelled'
     GROUP BY tanggal`,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    },
  );
});

// OPERATOR

// ambil semua jadwal
router.get("/all", auth(["operator", "admin"]), (req, res) => {
  const sql = `
    SELECT 
      jadwal.*,
      users.username
    FROM jadwal
    INNER JOIN users
      ON jadwal.user_id = users.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    console.log(result);

    res.json(result);
  });
});

// start sesi
router.put("/start/:id", auth(["operator"]), (req, res) => {
  const { id } = req.params;

  db.query("UPDATE jadwal SET status='ongoing' WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Sesi dimulai" });
  });
});

// selesai sesi
router.put("/done/:id", auth(["operator"]), (req, res) => {
  const { id } = req.params;

  db.query("UPDATE jadwal SET status='done' WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Sesi selesai" });
  });
});

// cancel
router.put("/cancel/:id", auth(["member", "admin"]), (req, res) => {
  db.query(
    "UPDATE jadwal SET status='cancelled' WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log("ERROR:", err);
        return res.status(500).json({ message: err.message });
      }

      res.json({ message: "Booking dibatalkan" });
    },
  );
});

// start
router.put("/start/:id", auth(["operator"]), (req, res) => {
  db.query(
    "UPDATE jadwal SET status='ongoing' WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Sesi dimulai" });
    },
  );
});

// done
router.put("/done/:id", auth(["operator"]), (req, res) => {
  db.query(
    "UPDATE jadwal SET status='done' WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Selesai" });
    },
  );
});

module.exports = router;
