# Kotoba — versi pribadi untuk GitHub + Vercel

Aplikasi belajar bahasa Jepang berbahasa Indonesia. **Paket ini siap diunggah ke GitHub, lalu dihubungkan ke Vercel.** Belum diterbitkan. Masuk dengan satu kata sandi; semua perangkat yang memakai kata sandi itu membuka progres pribadi yang sama.

166 pelajaran N5–N3, 26 evaluasi unit, 890 soal latihan, 60 soal evaluasi akhir, dan 533 berkas audio lokal. Materi tambahan masih draf untuk tinjauan pengajar.

## 1. Unggah ke GitHub

1. Ekstrak `kotoba-github-vercel.zip`.
2. Buat repository GitHub baru. Pilih **Private** bila tidak ingin sumber materi terlihat publik.
3. Buka folder hasil ekstraksi yang berisi `package.json` dan README ini. Unggah **isi folder tersebut**, bukan berkas ZIP, ke root repository.
4. Cara yang disarankan untuk banyak berkas: GitHub Desktop → **Add local repository** → buat repository di folder ini jika diminta → **Commit** → **Publish repository**.

Jika memakai Git lewat terminal, dari folder proyek:

```sh
git init
git add .
git commit -m "Siapkan Kotoba pribadi untuk Vercel"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin main
```

Ganti `USERNAME/NAMA-REPOSITORY` dengan repository milik Anda. Jangan menambahkan `.env.local`, token, kata sandi, database, atau folder `node_modules`. Aturannya sudah ada di `.gitignore`. Paket berisi ratusan berkas audio sehingga GitHub Desktop/Git lebih praktis daripada unggah satu per satu.

## 2. Siapkan database

Buat database **libSQL di Turso Cloud**, lalu salin URL database dan token aksesnya dari layanan Turso. SDK paket ini adalah `@libsql/client`; pilih database libSQL yang kompatibel. Jangan memakai berkas SQLite lokal untuk deployment Vercel.

Tabel dibuat otomatis saat permintaan database pertama dijalankan, tanpa menghapus data yang sudah ada. Schema juga tersedia di `db/schema.sql` dan `lib/schema.json`.

## 3. Hubungkan ke Vercel

1. Vercel → **Add New → Project** → impor repository GitHub tadi.
2. Framework: **Next.js**. Root Directory: folder yang berisi `package.json` (root jika mengikuti langkah unggah di atas).
3. Gunakan Node.js **22.x**. Install: `npm ci`; Build: `npm run build`. Output Directory biarkan bawaan Next.js.
4. Isi Environment Variables berikut **sebelum Deploy**:

|Nama|Isi|
|---|---|
|`APP_PASSWORD`|Kata sandi pribadi yang panjang, minimal 12 karakter. Jangan gunakan contoh dari internet.|
|`SESSION_SECRET`|Nilai acak rahasia minimal 32 karakter, berbeda dari kata sandi.|
|`TURSO_DATABASE_URL`|URL database libSQL dari Turso (`libsql://…` atau HTTPS).|
|`TURSO_AUTH_TOKEN`|Token akses database tersebut.|
|`OWNER_NAME`|Nama panggilan Anda; opsional.|

Buat SESSION_SECRET di komputer Anda dengan:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Salin hasilnya hanya ke pengaturan Vercel, bukan ke file yang diunggah. Variabel di atas bersifat server; **jangan** beri awalan `NEXT_PUBLIC_`.

5. Pilih **Deploy**, buka alamat yang diberikan Vercel, lalu masuk memakai APP_PASSWORD.
6. Setelah mengganti variabel, lakukan **Redeploy**. Mengubah APP_PASSWORD atau SESSION_SECRET membatalkan sesi lama. Sesi berakhir setelah 7 hari.

Untuk Preview Deployment, gunakan database dan rahasia terpisah agar pengujian tidak mengubah progres utama. Tanpa konfigurasi, login menampilkan bahwa aplikasi belum siap; tidak ada login demo yang terbuka.

## 4. Menjalankan dan memeriksa di komputer sendiri

Diperlukan Node.js 22.x dan npm.

```sh
npm ci
```

Salin `.env.example` menjadi `.env.local`, isi APP_PASSWORD dan SESSION_SECRET. Untuk database lokal sementara, gunakan `TURSO_DATABASE_URL=file:./kotoba-local.db` dan kosongkan token; untuk database cloud gunakan kredensial Turso Anda.

```sh
npm run dev
```

Buka alamat yang tercetak di terminal. Tabel otomatis disiapkan. Perintah `npm run db:migrate` tersedia bila ingin menyiapkannya lebih dulu.

```sh
npm test
npm run typecheck
npm run build
node tests/server-smoke.mjs
```

Uji terakhir menjalankan hasil build pada port 5191, memakai database dan kata sandi uji sementara di folder `work/` yang diabaikan Git. Tidak memakai database Turso Anda.

## Yang berubah dari paket lokal sebelumnya

- Next.js standar untuk Vercel; tanpa runtime Cloudflare/Sites.
- Login kata sandi pribadi menggantikan login simulasi ChatGPT.
- Penyimpanan libSQL/Turso menggantikan D1 lokal. Jawaban, pengulangan, kaiwa, dan evaluasi tetap memakai struktur yang sama.
- **Progres lokal lama tidak disertakan atau dipindahkan otomatis.** Versi online mulai dari progres kosong. Aplikasi lokal lama tetap terpisah.
- Kata sandi diperiksa di server; cookie sesi ditandatangani, HttpOnly, Secure pada produksi, dan SameSite Strict. Percobaan login dibatasi 20 per 15 menit untuk aplikasi pribadi ini.
- Sumber kurikulum/audio adalah aset aplikasi. Repository private menjaga sumber di GitHub; login melindungi akses progres. Ini bukan DRM untuk materi yang dikirim ke browser.

## Fitur opsional dan batas

Kaiwa tetap demo aturan kecuali `AI_GATEWAY_URL` dan `AI_GATEWAY_TOKEN` diatur mengikuti `docs/AI_GATEWAY.md`. Tidak ada kredensial AI dalam paket. Evaluasi internal bukan skor resmi atau jaminan kelulusan JLPT. N2/N1 dan simulasi ujian penuh belum tersedia.

Audio sintetis suara **Mei**, MMDAgent Project Team / Nagoya Institute of Technology, CC BY 3.0. Atribusi dan lisensi ada di `docs/licenses/Mei-voice.txt`. Berkas audio disertakan dalam repository; tidak perlu instalasi mesin suara pada Vercel.

## Panduan resmi

- [Mengunggah berkas ke GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Next.js di Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Environment Variables Vercel](https://vercel.com/docs/environment-variables)
- [Referensi SDK Turso/libSQL](https://docs.turso.tech/sdk/ts/reference)

Lihat `docs/VERIFIKASI-VERCEL.md` untuk hasil pemeriksaan paket dan batas verifikasi deployment.
