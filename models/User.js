// models/user.js (Kode Perbaikan Final)

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // ... (Definisi skema lainnya) ...
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

// --- Mongoose Pre-save hook: Hishing Password ---
// CATATAN: Menghilangkan (next) agar fungsi ni secara implisit mengembalikan Promise,
// yang merupakan cara paling aman untuk hook async
userSchema.pre('save', async function() {
    // 1. Cek apakah field password diubah atau merupakan dokumen baru
    if (!this.isModified('password')) {
        return; // Menggantikan return next()
    }
    // 2. Lakukan hashing
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- Method Instance: Membandingkan Password Saat Login ---
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password) 
};

const User = mongoose.model('User', userSchema);
module.exports = User;