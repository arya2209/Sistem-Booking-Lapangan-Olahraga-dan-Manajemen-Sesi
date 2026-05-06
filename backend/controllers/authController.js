const db = require("../config/db");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  userModel.createUser({ username, password: hashed, role }, (err) => {
    if (err) return res.status(500).send(err);
    res.send("Register berhasil");
  });
};

const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({ message: "User tidak ditemukan" });
      }

      const user = result[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({ message: "Password salah" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username, // ← INI WAJIB DITAMBAH
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({ token });
    },
  );
};
