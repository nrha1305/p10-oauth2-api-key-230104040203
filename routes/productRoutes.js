// routes/prductRoutes.js

const express = require('express');
const { 
    getPublicProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

// Import Middlewares
const validateApiKey = require('../middleware/validateApiKey'); // Langkah 3
const validateToken = require('../middleware/validateToken'); // Langkah 5

const router = express.Router();

// --- Route Publik (Dilindungi API Key) ---
// Endpoint: GET /api/v1/products/public
router.get('/public', validateApiKey, getPublicProducts);

// --- Route Privat (Dilindungi JWT / Bearer Token) ---
// Endpoint-endpoint ini memerlukan otentikasi (JWT) dan otorisasi (Role Admin, di dalam controller)
// CREATE Product
// Endpoint: POST /api.v1/products/private
router.post('/private', validateToken, createProduct);

// UPDATE Product
// Endpoint: PUT /api.v1/products/private/:id
router.put('/private/:id', validateToken, updateProduct);

// DELETE Product
// Endpoint: DELETE /api.v1/products/private/:id
router.delete('/private/:id', validateToken, deleteProduct);

// Semua route CUD (Create, Update, Delete) harus melalui validateToken

module.exports = router;