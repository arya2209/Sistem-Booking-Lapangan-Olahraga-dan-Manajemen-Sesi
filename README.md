"# Sistem-Booking-Lapangan-Olahraga-dan-Manajemen-Sesi" 

# Sistem Booking Lapangan Olahraga

Website sistem booking lapangan olahraga berbasis:
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL

Memiliki fitur:
- Login & Register
- Multi Role (Admin, Member, Operator)
- Booking Lapangan
- Cancel Booking
- Start & Done Session
- Statistik Dashboard
- Peak Hour
- Okupansi Lapangan
- Data Pembatalan

---

# Install Software

## 1. Install Node.js

Download:
https://nodejs.org

Cek versi:

```bash
node -v
npm -v
```

---

## 2. Install XAMPP

Download:
https://www.apachefriends.org

Jalankan:
- Apache
- MySQL

---

## 3. Install VS Code

Download:
https://code.visualstudio.com

---

## 4. Install Extension VS Code (Opsional)

### Live Server

Digunakan untuk menjalankan frontend HTML.

Install:
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

---

# Clone / Download Project

## Clone Repository

```bash
git clone https://github.com/username/project-booking.git
```

atau download ZIP project lalu extract.

---

# Install Dependency

Masuk ke folder backend:

```bash
cd backend
```

Install package:

```bash
npm install
```

Jika package belum ada, install manual:

```bash
npm install express
npm install mysql2
npm install cors
npm install dotenv
npm install jsonwebtoken
npm install bcryptjs
```

Install nodemon (opsional):

```bash
npm install -D nodemon
```

---

# Struktur Folder

```bash
project-booking/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   └── style.css
│
└── README.md
```

---

# Setup Database

## 1. Buat Database

Buka phpMyAdmin lalu buat database:

```sql
CREATE DATABASE booking_db;
```

---

## 2. Import Database

Import file:

```bash
booking_db.sql
```

melalui phpMyAdmin.

---

## 3. Konfigurasi Database

Buka file:

```bash
backend/config/db.js
```

Isi konfigurasi:

```js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'booking_db'
});

module.exports = db;
```

Sesuaikan:
- host
- username
- password
- database

---

# Menjalankan Backend

Masuk ke folder backend:

```bash
cd backend
```

Jalankan server:

```bash
node app.js
```

atau menggunakan nodemon:

```bash
nodemon app
```

Jika berhasil:

```bash
Server running on port 3000
```

---

# Menjalankan Frontend

Masuk ke folder frontend lalu buka:

```bash
index.html
```

atau gunakan Live Server.

---

# API Endpoint

## Auth

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Jadwal

### Booking

```http
POST /api/jadwal
```

### Booking Saya

```http
GET /api/jadwal/my
```

### Semua Booking

```http
GET /api/jadwal/all
```

### Cancel Booking

```http
PUT /api/jadwal/cancel/:id
```

### Start Session

```http
PUT /api/jadwal/start/:id
```

### Done Session

```http
PUT /api/jadwal/done/:id
```

---

# Role User

## Admin
- Melihat statistik dashboard
- Mengelola user
- Mengubah role user
- Melihat seluruh booking

## Member
- Booking lapangan
- Cancel booking
- Melihat booking pribadi

## Operator
- Start sesi
- Done sesi
- Monitoring sesi booking

---

# Status Booking

| Status      | Keterangan |
|-------------|------------|
| booked      | Booking aktif |
| ongoing     | Sesi sedang berjalan |
| done        | Sesi selesai |
| cancelled   | Booking dibatalkan |

---

# Statistik Dashboard

## Okupansi Lapangan
Menampilkan jumlah penggunaan setiap lapangan.

## Peak Hour
Menampilkan jam booking paling ramai.

## Pembatalan
Menampilkan jumlah booking yang dibatalkan.

---

# Package yang Digunakan

| Package | Fungsi |
|---------|---------|
| express | Backend framework |
| mysql2 | Koneksi MySQL |
| cors | Menghubungkan frontend & backend |
| dotenv | Environment variable |
| bcryptjs | Hash password |
| jsonwebtoken | Login token JWT |

---

# Command Penting

## Install Semua Dependency

```bash
npm install
```

## Menjalankan Server

```bash
node app.js
```

## Menjalankan Dengan Nodemon

```bash
nodemon app
```

---

# Tampilan Sistem

- Responsive UI
- Modern Dashboard
- Glassmorphism Login/Register
- Statistik Chart.js
- Multi Role Dashboard
- Status Badge Booking
- Animasi Halus

---

# Author

Arya