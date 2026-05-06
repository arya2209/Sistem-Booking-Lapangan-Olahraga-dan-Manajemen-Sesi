const jwt = require('jsonwebtoken');

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: "Token tidak ada" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ FIX DI SINI

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Akses ditolak" });
      }

      req.user = decoded;
      next();

    } catch (err) {
      console.log("JWT ERROR:", err.message);
      return res.status(401).json({ message: "Token tidak valid" });
    }
  };
};