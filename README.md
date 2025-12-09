# 🛡️ Praktikum 10 — Web Service Engineering  
# p10-oauth2-api-key-230104040203

### Dosen Pengampu
## Muhayat, M.IT

## Simulasi API Key & OAuth 2.0 (JWT) — Sistem Manajemen Produk

Repository ini berisi implementasi API menggunakan **API Key** untuk akses publik dan **OAuth 2.0 (JWT)** untuk akses privat (CRUD). Proyek ini menggunakan **Express.js**, **MongoDB Atlas**, dan **Mongoose**.

---

## 📌 Fitur Utama

### 🔑 Akses Publik — API Key
- Read-only: GET produk publik
- Menggunakan header: `x-api-key`
- API Key di-validasi di MongoDB
- API Key salah → `401 Unauthorized`

### 🔒 Akses Privat — OAuth 2.0 (JWT)
- Login menghasilkan Access Token (Bearer)
- Token diverifikasi middleware
- Role-based Authorization
  - `admin` → full CRUD
  - `user` → terbatas

---

## 📂 Struktur Folder
 
```` bash

 p10-oauth2-api-key-nimanda/
│
├── controllers/
│ ├── authController.js
│ └── productController.js
│
├── foto/
│ ├── 1.HTTPStatusCode.png
│ ├── 2.Gagal(KeyHilang).png
│ ├── 3.Gagal(KeyPalsu).png
│ ├── 4.Sukses(KeyValid).png
│ ├── 5.PengujianLogin.png
│ ├── 6.TokenUser.png
│ ├── 7.GAGAL(TokenHilang).png
│ ├── 8.GAGAL(TokenPalsu).png
│ ├── 9.SUKSES(TokenValid).png
│ ├── 10.Create(Admin).png
│ ├── 11.Create(UserBiasa).png
│ ├── 12.Update(Admin).png
│ ├── 13.Delete(UserBiasa).png
│ ├── 14.Delete(Admin).png
│
├── middleware/
│ ├── validateApiKey.js
│ └── validateToken.js
│
├── models/
│ ├── ApiKey.js
│ ├── Product.js
│ └── User.js
│
├── routes/
│ ├── authRoutes.js
│ └── productRoutes.js
│
├── seeders/
│ └── seed.js
│
├── utils/
│ └── generateToken.js
│
├── node_modules/
│
├── .env
├── package.json
├── package-lock.json
├── README.md
└── server.js

````

---

## 📦 Instalasi

### 1️⃣ Install dependency
```bash
npm install
```

### 2️⃣ Buat file .env
``` bash

# .env
PORT=3000
MONGODB_URI=mongodb+srv://wse_230104040203:Norhayati3304@cluster0.v4hpyn3.mongodb.net/p10_simulator_db?retryWrites=true&w=majority&appName=Cluster0

# Secret key untuk JWT, akan digunakan pada Langkah 4
JWT_SECRET=rahasia-super-aman-simulasi-jwt

```

### 3️⃣ Jalankan Seeder
``` bash
node seeders/seed.js
```
Seeder akan membuat:
``` bash
Admin (admin/password123)

User biasa (userbiasa/userpass)

2 API Key

Produk contoh
```

---

### ▶️ Menjalankan Server
```bash
node server.js
```
---

Output:
```bash
Koneksi ke MongoDB Atlas Berhasil
Server berjalan di http://localhost:3000
```
---

## Dokumentasi API
### 1. Akses Publik (API Key)
```bash
GET http://localhost:3000/api/v1/products/public
Header => x-api-key : PRATICUM_API_KEY_A_1234567890
Response:
{
    "message": "Daftar Produk berhasil diambil. Akses: API Key (Public App Client A)",
    "data": [
        {
            "_id": "69366f9f1189d5b09b716687",
            "name": "Laptop Gaming Pro",
            "price": 15000000,
            "stock": 10,
            "description": "Laptop performa tinggi.",
            "createdAt": "2025-12-08T06:26:39.462Z",
            "updatedAt": "2025-12-08T06:26:39.462Z"
        },
        {
            "_id": "69366f9f1189d5b09b716688",
            "name": "Monitor 4K Ultra",
            "price": 5000000,
            "stock": 25,
            "description": "Monitor dengan resolusi terbaik.",
            "createdAt": "2025-12-08T06:26:39.463Z",
            "updatedAt": "2025-12-08T06:26:39.463Z"
        },
        {
            "_id": "69366f9f1189d5b09b716689",
            "name": "Keyboard Mekanik",
            "price": 1500000,
            "stock": 50,
            "description": "Keyboard dengan switch tactile.",
            "createdAt": "2025-12-08T06:26:39.463Z",
            "updatedAt": "2025-12-08T06:26:39.463Z"
        },
        {
            "_id": "69366f9f1189d5b09b71668a",
            "name": "Mouse Wireles Ergonomis",
            "price": 500000,
            "stock": 80,
            "description": "Mouse nyaman untuk pemakaian lama.",
            "createdAt": "2025-12-08T06:26:39.463Z",
            "updatedAt": "2025-12-08T06:26:39.463Z"
        },
        {
            "_id": "6937b3a57fd99af4a2124115",
            "name": "Buku Algoritma",
            "price": 100000,
            "createdAt": "2025-12-09T05:29:09.247Z",
            "updatedAt": "2025-12-09T05:29:09.247Z"
        },
        {
            "_id": "6937bc4d1e764c8d40262a98",
            "name": "Buku Basis Data",
            "price": 150000,
            "createdAt": "2025-12-09T06:06:05.979Z",
            "updatedAt": "2025-12-09T06:06:05.979Z"
        },
        {
            "_id": "6937c277c6399f2ca1627b3a",
            "name": "Pensil 2B",
            "price": 5000,
            "createdAt": "2025-12-09T06:32:23.955Z",
            "updatedAt": "2025-12-09T06:32:23.955Z"
        }
    ]
}
```

### 2. Login (Mendapatkan JWT Token)
```bash
POST http://localhost:3000/api/v1/auth/token 
Body:
    {
    "username": "admin",
    "password": "password123"
    }
Response:
    {
    "token_type": "Bearer",
    "acces_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzY2ZjlmMTE4OWQ1YjA5YjcxNjY4YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NTI3NTMyMSwiZXhwIjoxNzY1ODgwMTIxfQ.MWDZWDCuzmAl-oZKBdnjwprGURUv9B1rY5TWmiCiouo",
    "expires_in": "7d",
    "user": {
        "id": "69366f9f1189d5b09b71668c",
        "uername": "admin",
        "role": "admin"
    }
}
```
### 3. Protected Routes (JWT)
```bash
|============================================|   
|Header:                                     |
|   Authorization: Bearer <JWT_TOKEN>        |
|============================================|   

➕ POST http://localhost:3000/api/v1/products/private
✏️ PUT http://localhost:3000/api/v1/products/private/:id
🗑️ DELETE http://localhost:3000/api/v1/products/private/:id (Admin Only)
```

## 🧪 Uji Coba Postman — API Key & OAuth 2.0 (JWT)
Berikut adalah hasil pengujian API, ditampilkan dalam bentuk tabel dengan screenshot sesuai folder `./foto/`.

---

# 🔑 1. PENGUJIAN API KEY

| No | Screenshot | Keterangan |
|----|------------|------------|
| 1 | <img src="./foto/1.HTTPStatusCode.png" width="350"> | **Referensi HTTP Status Code**<br>Digunakan sebagai acuan dalam memahami hasil response API. |
| 2 | <img src="./foto/2.Gagal(KeyHilang).png" width="350"> | **Gagal — API Key Hilang**<br>Request tanpa header `x-api-key` ditolak → `401 Unauthorized`. |
| 3 | <img src="./foto/3.Gagal(KeyPalsu).png" width="350"> | **Gagal — API Key Palsu**<br>API Key tidak cocok dengan database → `401 Unauthorized`. |
| 4 | <img src="./foto/4.Sukses(KeyValid.png" width="350"> | **Sukses — API Key Valid**<br>API Key valid memberikan akses ke data produk → `200 OK`. |

---

# 🔐 2. PENGUJIAN LOGIN & JWT TOKEN

| No | Screenshot | Keterangan |
|----|------------|------------|
| 5 | <img src="./foto/5.PengujianLogin.png" width="350"> | **Login Berhasil**<br>User memasukkan username & password → JWT token diterima. |
| 6 | <img src="./foto/6.TokenUser.png" width="350"> | **Token User Biasa**<br>User biasa login dan mendapatkan token role = `user`. |
| 7 | <img src="./foto/7.GAGAL(TokenHilang).png" width="350"> | **Gagal — Token Hilang**<br>Authorization header kosong → `403 Forbidden`. |
| 8 | <img src="./foto/8.GAGAL(TokenPalsu).png" width="350"> | **Gagal — Token Palsu**<br>Token tidak valid → `403 Forbidden`. |
| 9 | <img src="./foto/9.SUKSES(TokenValid).png" width="350"> | **Sukses — Token Valid**<br>Token valid memberi akses → `200 OK`. |

---

# 🛠️ 3. PENGUJIAN CRUD PRODUK (Protected Routes)

| No | Screenshot | Keterangan |
|----|------------|------------|
| 10 | <img src="./foto/10.Create(Admin).png" width="350"> | **Create Produk (Admin)**<br>Admin dapat membuat produk → `201 Created`. |
| 11 | <img src="./foto/11.Create(UserBiasa).png" width="350"> | **Create Produk (User Biasa)**<br>Tergantung aturan: bisa sukses atau gagal otorisasi. |
| 12 | <img src="./foto/12.Update(Admin).png" width="350"> | **Update Produk (Admin)**<br>Admin melakukan update → `200 OK`. |
| 13 | <img src="./foto/13.Delete(UserBiasa).png" width="350"> | **Delete Produk Gagal (User Biasa)**<br>User biasa tidak boleh delete → `403 Forbidden`. |
| 14 | <img src="./foto/14.Delete(Admin).png" width="350"> | **Delete Produk Berhasil (Admin)**<br>Admin berhasil menghapus produk → `200 OK`. |

---

### Kesimpulan Akhir

Penerapan API Key dan OAuth 2.0 menggunakan JWT pada praktikum ini berhasil menunjukkan bagaimana lapisan keamanan berperan penting dalam pengembangan API modern. Dengan adanya pemisahan akses antara API publik dan privat, serta penerapan role-based authorization, sistem menjadi lebih aman dan terstruktur.

Melalui pengujian Postman, seluruh alur berhasil diverifikasi:

API Key bekerja dengan baik untuk menyediakan akses publik yang aman.

Proses login menghasilkan JWT token yang valid sebagai akses privat.

Middleware mampu memverifikasi token dan menolak akses ilegal.

Role admin dan user berjalan sesuai aturan, terutama pada operasi CRUD kritis.

Semua endpoint memberikan respons yang konsisten dengan standar HTTP.
``` bash
Secara keseluruhan, praktikum ini memperkuat pemahaman mengenai:

✔ Manajemen otentikasi dan otorisasi pada API
✔ Penggunaan middleware sebagai lapisan keamanan
✔ Penerapan JWT dalam skema OAuth 2.0 sederhana
✔ Praktik terbaik dalam membangun RESTful API yang aman

Dengan fondasi ini, mahasiswa diharapkan mampu membangun API yang tidak hanya berfungsi dengan baik, tetapi juga mengutamakan keamanan dan keandalan.
```

---
