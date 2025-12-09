// server.js

// 1. Membuat Variabel Lingkungan 
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// --- IMPORT ROUTES (Perbaikan: Pindahkan ke sini) ---
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 
// Asumsi: Di Langkah 4 dan 6, Anda juga akan mengimpor const authRoutes

// Middleware bawaan untuk parsing body JSON
app.use(express.json());

// --- 2. Koneksi ke MongoDB Atlas ---
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(' Koneksi ke MongoDB Atlas Berhasil');
    }catch (err) {
console.error('GAGALno KONEKSI ke MongoDB Atlas:' , err.message);
// Keluar dari proses jika koneksi database gagal
process.exit(1);
    }
};

// ... kode middleware & route dasar ...
// --- 3. Route Dasar (Pengujian) ---
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Server Berjalan',
        praktikum: 'P10: Simulasi API key & OAuth 2.0',
    });
});

// --- 4. Integrasi routes (Perbaikan: Pindah ke sini) ---
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

// ... kode koneksi DB & startServer

// --- 5. Memulai Server ---
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
        console.log(`-------------------------------------------`);
    });
};

// Panggil fungsi koneksi database, lalu jalankan server
connectDB().then(startServer);
