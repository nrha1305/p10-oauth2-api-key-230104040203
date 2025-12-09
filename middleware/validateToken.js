// middleware/validateToken.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); //Diperlukan untuk mencari detail user jika perlu

/**
 * Middleware untuk memverifikasi JWT dari Authorization header (Bearer Token).
*/
const validateToken = async (req, res, next) => {
    let token;

    // 1. cek header Authorization
    // Format: Authorization: Bearer <token>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Ekstrak token (hilangkan 'Bearer')
            token = req.headers.authorization.split(' ')[1];

            // 3. Verifikasi token menggunakan secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. (Opsional) Cari user di DB, hanya untuk meemastikan user masih ada dan aktif 
            // Dalam praktikum ini, kita cukup melampirkan data dari token
            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            // 5. Lanjut ke handler route berikutnya
            next();
        } catch (error) {
            // Jika token tidak valid, expired, atau secret key salah
            console.error('Token verification Error:', error.message)
            return res.status(403).json({
                message:'Akses Ditoklak:Token tidak valid atau kedaluwarsa.'
            });
        }
    } else {
        // Jika token tidak ada di header
        return res.status(403).json({
            message: 'Akses Ditolak: Tidak ada Token Bearer yang ditemukan.'
        });
    }
};

module.exports = validateToken;