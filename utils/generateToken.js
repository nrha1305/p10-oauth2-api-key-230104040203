// utils/generateToken.js

const jwt = require('jsonwebtoken');
/**
 * Fungsi untuk membuat JSON Web Token (JWT)
 * @param {string} id - ID pengguna (user_id)
 * @param {string} role - peran pengguna
 * @returns {string} JWT Token
 */
const generatetoken = (id, role) => {
    // Tanda tangan (sign) token dengan payload dan secret key dari .env
    return jwt.sign(
        { id, role }, // Payload: Data yang disimpan dalam token
        process.env.JWT_SECRET, // Secret Key untuk menada-tangani
        {
            expiresIn: '7d', // Token kedaluarsa dalam 7 hari (contoh)
        }
    );
};

module.exports = generatetoken;