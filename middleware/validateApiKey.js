// middleware/validateApiKey.js

const ApiKey = require('../models/ApiKey');

/**
 * Middleware untuk memvalidasi API Key dari header X_API_KEY.
 * Jika Valid, request akan dilanjutkan (next()).
 * Jika tidak valid, akan mengembalikan 401 Unauthorized.
 */
const validateApiKey = async (req, res, next) => {
    // 1. Ekstrak key dari header
    const apiKey = req.header('x-api-key');

    // Periksa juga jika ada di header Authorization
    // const apikey = req.header('Authorization')?.replace('ApiKey', '');

    // 2. Periksa keberadaan key
    if (!apiKey) {
        return res.status(401).json({
            message: 'Akses Ditolak: API Keytidak ditemukan di header "x-api-key".'
        });
    }

    try {
    // 3. Cari key di database dan pastikan statusnya 'active'
    const existingKey = await ApiKey.findOne({
        key: apiKey,
        status: 'active'
    });
    if (!existingKey) {
        return res.status(401).json({
            message: 'Akses Ditolak: API Key tidak valid atau sudah dicabut.'
        });
    }

    // 4. (Opsional) Sematkan data key request untuk loggin/limit
    req.apiKey = existingKey;

    // 5. Lanjutkan ke hadler route berikutnya
    next();
    }catch (error) {
        console.error('API Key Validation Error:', error);
        return res.status(500).json({ message: 'Internal Server Error selama validasi API Key.' });
    }
};

module.exports = validateApiKey;