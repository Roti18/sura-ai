# ✨ Sura Ai

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-%23007ACC.svg?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/)

> SURA AI adalah chatbot cerdas yang memahami bahasa dan budaya Indonesia, siap berdiskusi tentang isu-isu lokal dengan perspektif yang informatif dan konstruktif.

## ✨ Fitur Utama

- **Chatbot Berbasis Bahasa Indonesia:** Sura AI dirancang untuk memahami dan merespon dengan bahasa Indonesia, mengakomodasi nuansa dan konteks budaya lokal.
- **Diskusi Isu Lokal:** Chatbot ini difokuskan pada kemampuan untuk berdiskusi dan memberikan informasi seputar isu-isu terkini di Indonesia.
- **Respon yang Informatif dan Konstruktif:** Sura AI bertujuan untuk memberikan respon yang tidak hanya informatif, tetapi juga membangun dan menghindari penyebaran informasi yang menyesatkan.
- **Integrasi OpenAI API:** Menggunakan API dari OpenAI untuk pemrosesan bahasa alami dan menghasilkan respon yang cerdas dan relevan.
- **Antarmuka Pengguna yang Ramah:** Didukung oleh Next.js dan React, Sura AI menawarkan pengalaman pengguna yang intuitif dan mudah digunakan.

## 🛠️ Tumpukan Teknologi

| Kategori           | Teknologi    | Catatan                                                |
| ------------------ | ------------ | ------------------------------------------------------ |
| Framework          | Next.js      | Framework React untuk aplikasi web.                    |
| Perpustakaan UI    | React        | Library JavaScript untuk membangun antarmuka pengguna. |
| Styling            | Tailwind CSS | Framework CSS utilitas untuk styling cepat.            |
| Bahasa Pemrograman | TypeScript   | Superset dari JavaScript dengan pengetikan statis.     |
| API                | OpenAI       | Untuk pemrosesan bahasa alami dan kecerdasan buatan.   |

## 🏛️ Tinjauan Arsitektur

Sura AI merupakan aplikasi _full-stack_ yang dibangun menggunakan Next.js. Arsitektur mengikuti pola standar Next.js dengan pemisahan antara komponen UI (dalam direktori `src/components`), logika bisnis (dalam `src/utils`), dan API (dalam `src/app/api/sura`). Data pelatihan atau pengetahuan chatbot kemungkinan besar disimpan dalam file `src/utils/dataset.json`.

## 🚀 Memulai

1. **Kloning Repositori:**

   ```bash
   git clone https://github.com/Roti18/sura-ai.git
   cd sura-ai
   ```

2. **Instalasi Dependensi:**

   ```bash
   npm install
   ```

3. **Buat environment:**

   ```bash
   code .env
   ```

4. **Tambahkan apikey dari lunos (gpt-4.1 mini):**

   ```bash
   OPENAI_API_KEY=MASUKKAN_API_KEY_KAMU
   ```

   Ambil apikey disini: [Lunos](https://lunos.tech/dashboard/api-keys)

5. **Tambahkan Client Key (opsional):**

   ```bash
   X_CLIENT_KEY=CLIENT_KEY_KAMU
   ```

   > Tambahkan Client Key jika kamu tidak ingin orang lain seenaknya mengakses apikey kamu. Contoh: X_CLIENT_KEY=1234567890-INI-CONTOH

6. **Menjalankan Server Pengembangan:**
   ```bash
   npm run dev
   ```
   Akses aplikasi di `http://localhost:3000`.

## 📂 Struktur File

```
/
├── .gitignore
├── README.md
├── biome.json
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── brain-cog.png
│   └── brain.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   └── sura
│   │   │       └── route.ts  (Endpoint API untuk chatbot)
│   │   ├── globals.css
│   │   ├── layout.tsx     (Layout utama aplikasi)
│   │   ├── page.tsx       (Halaman utama aplikasi)
│   │   └── sura
│   │       └── page.tsx    (Halaman khusus chatbot)
│   ├── components
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   └── utils
│       ├── aiAgent.ts     (Logika utama interaksi dengan OpenAI API)
│       └── dataset.json   (Data pelatihan atau pengetahuan chatbot)
└── tsconfig.json
```

- **`src`:** Direktori utama kode sumber aplikasi.
- **`src/app`:** Berisi struktur aplikasi Next.js, termasuk halaman dan API.
- **`src/components`:** Komponen UI yang dapat digunakan kembali.
- **`src/utils`:** Berisi logika bisnis dan utilitas.
- **`public`:** Direktori untuk aset statis seperti gambar.
