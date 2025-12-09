// routes/authRoutes.js

const express = require('express');
const { authUser } = require('../controllers/authController');

const router = express.Router();

// Endpoint untuk mendapatkan Access Token
router.post('/token', authUser);

module.exports = router;