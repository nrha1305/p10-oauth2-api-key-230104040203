// controllers/authController.js

const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Handler untuk proses login dan pemberian Acces token (Simulasi token Grant)
 * POST /api v1/auth/token
 */
const authUser = async (req, res) => {
const { username, password } = req.body;

    // 1. cari pengguna
    const user = await User.findOne({ username });

    // 2. Validasi kredensial
    // Cek keberadaan user DAN bandingkan password (menggunakan bcrypt)
    if (user && (await user.matchPassword(password))) {
        // 3. Jika valid, buat token
        const token = generateToken(user._id, user.role);

        // 4. Kirimkan token dalam format standar OAuthn2.0
        res.status(200).json({
            token_type: 'Bearer',
            acces_token: token,
            expires_in: '7d',
            user: {
                id: user._id,
                uername: user.username,
                role: user.role,
            }
        });
    } else {
        // Jika tidak valid, kirim 401
        res.status(401).json({
            message: 'Otentikasi Gagal: username atau Password tidak valid.'
        });
    }
};

module.exports = { authUser };