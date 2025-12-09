// controllers/productController.js

const Product = require('../models/Product');

// ==========================================================
// 1. HANDLER PUBLIC (API Key Protected)
// GET /api/v1/products/public
// ==========================================================

const getPublicProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v');

        const keyOwner = req.apiKey ? req.apiKey.owner : 'N/A';
        
        res.status(200).json({
            message: `Daftar Produk berhasil diambil. Akses: API Key (${keyOwner})`,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching public products:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data produk publik.' });
    }
};

// ==========================================================
// 2. HANDLER PRIVATE (JWT Protected & Role Based)
// ==========================================================

// CREATE
const createProduct = async (req, res) => {
    const { id, role } = req.user;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: hanya Admin yang boleh membuat produk.' });
    }

    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            message: `Produk berhasil dibuat oleh ${role} (ID: ${id})`,
            data: newProduct,
        });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(400).json({ message: 'Gagal membuat produk.', details: error.message });
    }
};

// UPDATE
const updateProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Akses Ditolak: Hanya Admin yang boleh mengedit produk.'
        });
    }

    const { id } = req.params;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }

        res.status(200).json({
            message: 'Produk berhasil diperbarui.',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(400).json({ message: 'Gagal memperbarui produk.', details: error.message });
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Akses Ditolak: Hanya Admin yang boleh menghapus produk.'
        });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }

        res.status(200).json({ message: 'Produk berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Gagal menghapus produk.' });
    }
};

// ==========================================================
// EXPORT
// ==========================================================

module.exports = {
    getPublicProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
