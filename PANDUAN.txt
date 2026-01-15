================================================================================
                    MSTOREBOT SIMPLE IMAGEHOST - PANDUAN LENGKAP
================================================================================

Selamat datang di MStoreBot Simple ImageHost!
Platform hosting gambar sederhana yang bisa kamu deploy ke Vercel.

================================================================================
                              INSTALASI
================================================================================

PERSYARATAN:
- Node.js versi 18 atau lebih baru
- Akun Vercel (gratis di https://vercel.com)
- Git (opsional, untuk clone repository)

LANGKAH INSTALASI LOKAL:

1. Download atau clone project ini

2. Buka terminal/command prompt, masuk ke folder project:
   cd imagehost-main

3. Install semua dependencies:
   npm install --legacy-peer-deps

4. Jalankan development server:
   npm run dev

5. Buka browser dan akses:
   http://localhost:3000

================================================================================
                           DEPLOY KE VERCEL
================================================================================

CARA DEPLOY:

1. Push project ke GitHub/GitLab/Bitbucket

2. Login ke https://vercel.com

3. Klik "Add New Project" -> Import repository kamu

4. Vercel akan otomatis detect Next.js dan konfigurasinya

5. PENTING - Setup Blob Storage:
   - Di dashboard Vercel, pilih project kamu
   - Pergi ke "Storage" tab
   - Klik "Create" -> pilih "Blob"
   - Ikuti instruksi untuk membuat Blob store baru
   - Blob store akan otomatis terhubung ke project

6. Setup Environment Variables:
   - Pergi ke "Settings" -> "Environment Variables"
   - Tambahkan variable berikut:

   CRON_SECRET = [buat random string panjang untuk keamanan cron job]

   Contoh: CRON_SECRET = rahasia_super_aman_123456789

7. Klik "Deploy" dan tunggu proses selesai

8. Setelah deploy, URL kamu akan seperti:
   https://nama-project-kamu.vercel.app

================================================================================
                              KONFIGURASI
================================================================================

Semua pengaturan ada di file: settings.ts

PENGATURAN EMBED (untuk preview di Discord/sosmed):
- Site Name: Nama yang muncul di embed
- Title: Judul embed (bisa pakai variabel dinamis)
- Description: Deskripsi embed
- Color: Warna embed dalam format hex (#7289da)

VARIABEL DINAMIS yang bisa dipakai:
- %file_name% = Nama file yang diupload
- %file_size% = Ukuran file
- %uploaded_files% = Total file yang sudah diupload
- %file_upload_timestamp% = Waktu upload

PENGATURAN SITE:
- Title: Judul website
- Description: Deskripsi website
- Show Credits: true/false untuk tampilkan credit

PENGATURAN LAINNYA:
- page_redirect: URL redirect halaman utama (production)
- upload_limit: Batas ukuran file dalam MB (default: 10MB)
- api_key: API key untuk upload via API
- image_expiration_minutes: Waktu expired gambar dalam menit (default: 5 menit)

GANTI API KEY:
Kalau mau ganti API key, generate di: https://generate-random.org/api-keys
Lalu ganti nilai api_key di settings.ts

================================================================================
                           CARA PAKAI API
================================================================================

API UPLOAD GAMBAR:

Endpoint: POST /api/upload
Content-Type: multipart/form-data

HEADER YANG DIBUTUHKAN:
Authorization: Bearer [API_KEY_KAMU]

BODY (form-data):
file: [file gambar kamu]

FORMAT FILE YANG DIDUKUNG:
- PNG (.png)
- JPEG/JPG (.jpg, .jpeg)
- GIF (.gif)
- WebP (.webp)

BATAS UKURAN: 10MB (bisa diubah di settings.ts)

--------------------------------------------------------------------------------
CONTOH REQUEST MENGGUNAKAN CURL:
--------------------------------------------------------------------------------

curl -X POST https://nama-project-kamu.vercel.app/api/upload \
  -H "Authorization: Bearer mstorebot_VybPIpV76OHCrItevHCUmwKm5k7c09pcuChqASPkivhTqu4PxyZa1GoRF9cXKaxgiA4NCdnNE4AcB4kUnMq0qcqvc9DI8zBAmzK2U0sHNYHnzcNySHtCIJxu40W3G4GhgsiJ5JBF06ALt79xOdUvYMwuharVLtzrCNAqRkx5CSAFYjbwskwcoDY2yuXJaRw9YF6ix62SMGVSe7qDIUP6qSIrYUqNg1clcXXL65r4XpMcQrEfh9HNdSeOLQxLvBsQ" \
  -F "file=@gambar_kamu.png"

--------------------------------------------------------------------------------
CONTOH RESPONSE SUKSES:
--------------------------------------------------------------------------------

{
  "success": true,
  "url": "https://nama-project-kamu.vercel.app/AbCdEfGhIj",
  "direct_url": "https://xxx.public.blob.vercel-storage.com/AbCdEfGhIj.png",
  "filename": "AbCdEfGhIj.png"
}

PENJELASAN RESPONSE:
- success: Status upload (true = berhasil)
- url: Link untuk view gambar dengan embed preview
- direct_url: Link langsung ke file gambar (untuk hotlink)
- filename: Nama file yang tersimpan di server

--------------------------------------------------------------------------------
CONTOH RESPONSE ERROR:
--------------------------------------------------------------------------------

Unauthorized (API key salah):
{"error": "Unauthorized"}

File tidak ditemukan:
{"error": "No file found. Please upload a file using the 'file' field."}

Format file tidak didukung:
{"error": "Only PNG, JPEG, GIF, or WebP files are allowed."}

File terlalu besar:
{"error": "File size exceeds the allowed limit of 10MB."}

================================================================================
                      CONTOH PENGGUNAAN DI BERBAGAI BAHASA
================================================================================

--------------------------------------------------------------------------------
JAVASCRIPT/NODE.JS:
--------------------------------------------------------------------------------

const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function uploadGambar(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await fetch('https://nama-project-kamu.vercel.app/api/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer API_KEY_KAMU_DISINI'
    },
    body: form
  });

  const result = await response.json();
  console.log(result);
  return result;
}

uploadGambar('./gambar.png');

--------------------------------------------------------------------------------
PYTHON:
--------------------------------------------------------------------------------

import requests

def upload_gambar(file_path):
    url = 'https://nama-project-kamu.vercel.app/api/upload'
    headers = {
        'Authorization': 'Bearer API_KEY_KAMU_DISINI'
    }

    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(url, headers=headers, files=files)

    return response.json()

result = upload_gambar('gambar.png')
print(result)

--------------------------------------------------------------------------------
PHP:
--------------------------------------------------------------------------------

<?php
function uploadGambar($filePath) {
    $url = 'https://nama-project-kamu.vercel.app/api/upload';
    $apiKey = 'API_KEY_KAMU_DISINI';

    $curl = curl_init();

    $postFields = [
        'file' => new CURLFile($filePath)
    ];

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey
        ]
    ]);

    $response = curl_exec($curl);
    curl_close($curl);

    return json_decode($response, true);
}

$result = uploadGambar('gambar.png');
print_r($result);
?>

================================================================================
                           FITUR AUTO-HAPUS GAMBAR
================================================================================

Gambar akan otomatis dihapus setelah waktu yang ditentukan di settings.ts
Default: 5 menit

CARA KERJA:
- Vercel Cron Job jalan setiap menit
- Cek semua gambar yang sudah melewati batas waktu
- Hapus gambar yang expired secara otomatis

UBAH WAKTU EXPIRED:
Buka settings.ts dan ubah nilai image_expiration_minutes
Contoh: image_expiration_minutes = 60  // expired setelah 1 jam

MATIKAN AUTO-HAPUS:
Set nilai yang sangat besar, contoh:
image_expiration_minutes = 999999  // sekitar 2 tahun

================================================================================
                              TROUBLESHOOTING
================================================================================

ERROR: "Blob storage not configured"
- Pastikan sudah setup Vercel Blob di dashboard Vercel
- Cek apakah BLOB_READ_WRITE_TOKEN sudah ter-set

ERROR: "Unauthorized"
- Cek API key di header Authorization
- Pastikan format: "Bearer [API_KEY]" (ada spasi setelah Bearer)
- Cek apakah API key sama dengan yang di settings.ts

ERROR: "File size exceeds the allowed limit"
- Kurangi ukuran file atau
- Naikkan nilai upload_limit di settings.ts

GAMBAR TIDAK MUNCUL:
- Tunggu beberapa detik, Vercel Blob butuh waktu untuk propagasi
- Cek apakah gambar belum expired

CRON JOB TIDAK JALAN:
- Pastikan CRON_SECRET sudah di-set di Environment Variables
- Cek log di Vercel dashboard -> Functions -> api/cleanup

================================================================================
                              SUPPORT & CREDIT
================================================================================

Project ini dibuat dengan Next.js 16 dan Vercel Blob Storage.

Original Author: upio (https://github.com/notpoiu)
Modified & Enhanced by: MStoreBot

Butuh bantuan? Buka issue di repository GitHub project ini.

================================================================================
