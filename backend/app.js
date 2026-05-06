require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// IMPORT ROUTES (HANYA SEKALI!)
const authRoutes = require('./routes/authRoutes');
const lapanganRoutes = require('./routes/lapanganRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');
const userRoutes = require('./routes/userRoutes');

// DAFTARKAN ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/lapangan', lapanganRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/api/users', userRoutes);

// SERVER
app.listen(3000, () => {
  console.log('Server running on port 3000');
});