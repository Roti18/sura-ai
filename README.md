# ✨ Sura Ai

[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/framework-Next.js-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/library-React-61DAFB.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/styling-Tailwind%20CSS-3A3742.svg)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/database-Prisma-37b56f.svg)](https://www.prisma.io/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-007bff.svg)](https://platform.openai.com/)
[![Biome](https://img.shields.io/badge/linter-Biome-f7df1e.svg)](https://biome.link/)

> SURA AI adalah chatbot cerdas yang memahami bahasa dan budaya Indonesia, siap berdiskusi tentang isu-isu lokal dengan perspektif yang informatif dan konstruktif.

## ✨ Fitur Utama

- **Antarmuka Percakapan yang Intuitif:** Pengguna dapat berinteraksi dengan chatbot melalui antarmuka percakapan yang ramah pengguna, dibangun dengan React dan Next.js.
- **Penggunaan Bahasa Indonesia yang Alami:** Chatbot dirancang untuk memahami dan merespon dalam Bahasa Indonesia dengan nuansa lokal yang tepat.
- **Integrasi OpenAI:** Menggunakan kekuatan model bahasa OpenAI untuk menghasilkan respons yang informatif dan kontekstual.
- **Otentikasi Pengguna yang Aman:** Sistem otentikasi aman menggunakan NextAuth.js untuk pengelolaan pengguna dan sesi. (Dilihat dari `src/app/api/auth/[...nextauth]/route.ts`)
- **Pengiriman Email (Potensial):** Terdapat kode untuk pengiriman email (`src/app/api/mailry/send/route.ts`), kemungkinan digunakan untuk notifikasi atau verifikasi akun.
- **API untuk Interaksi Chatbot:** Memiliki endpoint API khusus untuk berinteraksi dengan chatbot (`src/app/api/chat/route.ts` dan `src/app/api/sura/route.ts`).
- **Manajemen Halaman (Login dan Chat):** Aplikasi memiliki halaman login terpisah dan halaman utama untuk interaksi chat (`src/app/login/page.tsx` dan `src/app/chat/page.tsx`).
- **Komponen UI yang Terstruktur:** Penggunaan komponen React yang terorganisir untuk antarmuka pengguna yang konsisten (`src/components`).

## 🛠️ Tumpukan Teknologi

| Kategori   | Teknologi    | Catatan                                      |
| ---------- | ------------ | -------------------------------------------- |
| Bahasa     | TypeScript   | Bahasa pemrograman utama aplikasi.           |
| Framework  | Next.js      | Framework React untuk aplikasi full-stack.   |
| Library    | React        | Library JavaScript untuk antarmuka pengguna. |
| Styling    | Tailwind CSS | Framework CSS untuk styling yang mudah.      |
| Database   | Prisma       | ORM untuk manajemen database.                |
| Otentikasi | NextAuth.js  | Library untuk otentikasi pengguna.           |
| AI         | OpenAI       | API untuk model bahasa.                      |
| Linter     | Biome        | Tool untuk menjaga kualitas kode.            |

## 🏛️ Tinjauan Arsitektur

Aplikasi ini menggunakan arsitektur full-stack berbasis Next.js, yang menggabungkan backend dan frontend dalam satu basis kode. Prisma digunakan untuk berinteraksi dengan database, sementara OpenAI memberikan kemampuan AI. NextAuth.js menangani otentikasi pengguna. Struktur kode yang modular dan komponen-komponen UI yang reusable memudahkan pemeliharaan dan pengembangan lebih lanjut.

## 🔧 Konfigurasi Environment Variables

Buat file `.env` di root project dan tambahkan semua konfigurasi berikut:

```bash
# API Keys
LUNOS_API_KEY=your_lunos_api_key_here
UNLI_API_KEY=your_unli_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration
MAILRY_API_KEY=your_mailry_api_key_here
MAILRY_EMAIL_ID=your_email_id_here

# Authentication
X_CLIENT_KEY=your_client_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
```

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

3. **Buat File Environment:**

   ```bash
   touch .env
   # atau
   code .env
   ```

4. **Konfigurasi API Keys:**

   ### Lunos API (Wajib)

   ```bash
   LUNOS_API_KEY=your_lunos_api_key_here
   ```

   📍 Dapatkan API key di: [Lunos Dashboard](https://lunos.tech/dashboard/api-keys)

   ### Client Key (Opsional tapi Direkomendasikan)

   ```bash
   X_CLIENT_KEY=your_secret_client_key_123
   ```

   ⚠️ **Penting:** Tambahkan Client Key untuk melindungi API key Anda dari akses tidak sah.

5. **Menjalankan Server Pengembangan:**
   ```bash
   npm run dev
   ```
   🌐 Akses aplikasi di: `http://localhost:3000`

## 🔐 Konfigurasi Authentication (Opsional)

### NextAuth Setup

```bash
# Generate secret key
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
```

### Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih yang sudah ada
3. Aktifkan Google+ API
4. Buat OAuth 2.0 credentials
5. Tambahkan ke `.env`:
   ```bash
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

### GitHub OAuth

1. Buka [GitHub Settings](https://github.com/settings/developers)
2. Buat OAuth App baru
3. Tambahkan ke `.env`:
   ```bash
   GITHUB_ID=your_github_app_id
   GITHUB_SECRET=your_github_app_secret
   ```

## 📧 Konfigurasi Email (Opsional)

### Mailry

```bash
MAILRY_API_KEY=your_mailry_api_key
MAILRY_EMAIL_ID=your_sender_email
```

## 🛠️ Scripts Tersedia

```bash
# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Jalankan production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Build dan Deployment

### Build untuk Production

```bash
npm run build
```

### Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

### Deploy ke Netlify

```bash
npm run build
# Upload folder 'dist' atau '.next' ke Netlify
```

## 🔧 Troubleshooting

### Error: Missing API Key

- Pastikan semua API key yang diperlukan sudah diisi di file `.env`
- Restart development server setelah menambah environment variables

### Error: Port Already in Use

```bash
# Gunakan port lain
npm run dev -- --port 3001
```

### Error: Module Not Found

```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Dokumentasi API

### Endpoint Utara

- `GET /api/chat` - Chat dengan AI
- `POST /api/auth/signin` - Login user
- `GET /api/auth/session` - Get user session

### Headers yang Diperlukan

```bash
Authorization: Bearer your_api_key
X-Client-Key: your_client_key  # jika dikonfigurasi
Content-Type: application/json
```

---

**🎯 Tips:**

- Simpan file `.env` dengan aman dan jangan commit ke repository
- Gunakan Client Key untuk keamanan tambahan
- Pastikan semua dependencies sudah terinstall sebelum menjalankan
- Check dokumentasi API provider untuk limit dan pricing

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
│   ├── brain.svg
│   └── default-avatar.png
├── src
│   ├── app             // Direktori utama untuk aplikasi Next.js, mengandung API routes dan halaman.
│   │   ├── api         // Endpoint API untuk berbagai fungsi, termasuk otentikasi dan interaksi chatbot.
│   │   ├── components  // Komponen UI yang dapat digunakan kembali.
│   │   ├── utils       // Fungsi utilitas dan logika bisnis.
│   │   └── ...
│   └── ...
└── tsconfig.json
```
