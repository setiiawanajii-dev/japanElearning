# Kotoba — tanpa login, langsung pakai

**Versi ini tidak membutuhkan kata sandi, database, Turso, atau Environment Variables.** Unggah kode ke GitHub, impor ke Vercel, lalu Deploy. Siapa saja dapat membuka tautannya; progres masing-masing disimpan di browser mereka.

## Mengganti versi sebelumnya di GitHub

Gunakan **isi paket `kotoba-tanpa-login.zip`**, bukan paket lama `kotoba-github-vercel.zip`.

Cara paling mudah agar file lama tidak tertinggal: buat repository baru, lalu unggah seluruh isi folder hasil ekstraksi. `package.json`, `vercel.json`, dan README ini harus berada di halaman utama repository. Gunakan GitHub Desktop/Git untuk ratusan berkas audio.

Jika memperbarui repository lama, ganti isinya dengan paket ini. Hapus folder/file lama yang tidak ada di paket baru, khususnya `app/api`, `app/login`, `db`, file `lib/auth*`, `lib/database.ts`, `lib/request-origin.ts`, `lib/schema.json`, dan `.env.example`. Jangan hanya menambahkan file baru di atas versi lama. Paket baru tidak memiliki endpoint login atau database.

## Pengaturan Vercel

1. **Add New → Project**, pilih repository baru, lalu Import.
2. Framework **Next.js**; Root Directory `./` jika package.json berada di root.
3. Build `npm run build`; Install `npm ci`; Node.js **22.x**.
4. Output Directory biarkan default Next.js; jangan override. Proyek sudah memakai static export.
5. **Environment Variables: kosong.** Tidak perlu menambahkan integrasi Turso.
6. Klik **Deploy**. Setelah selesai, buka tautannya, isi nama panggilan, dan mulai belajar.

Jika memakai proyek Vercel lama, hapus variabel APP_PASSWORD, SESSION_SECRET, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, OWNER_NAME, AI_GATEWAY_URL, dan AI_GATEWAY_TOKEN jika sebelumnya pernah diisi, lalu redeploy sumber baru. Jangan menghapus database Turso yang berisi data yang masih ingin disimpan; aplikasi ini hanya tidak lagi memakainya.

## Progres dan cadangan

- Browser/perangkat berbeda: progres berbeda.
- Browser yang sama pada perangkat yang sama: progres bersama. Gunakan profil browser berbeda jika satu komputer dipakai beberapa orang.
- Tidak ada akun atau sinkronisasi otomatis antarperangkat.
- Progres bisa hilang jika data situs dibersihkan atau mode privat ditutup. Gunakan **Profil & pengaturan → Unduh cadangan progres**.
- Untuk pindah perangkat, buka **Impor cadangan JSON**, pilih berkas, periksa ringkasan, lalu konfirmasi penggantian progres. Berkas berisi profil dan riwayat belajar; simpan sendiri.
- Cadangan mencakup profil, penguasaan soal, pengulangan, pelajaran selesai, statistik, 500 jawaban terbaru, 60 percakapan terbaru, dan 10 hasil evaluasi terakhir per level. Draf evaluasi belum dikirim tersimpan terpisah pada browser dan tidak masuk cadangan.
- Progres dari versi server/D1/Turso lama tidak dipindahkan otomatis. Paket ini tidak menyertakan data pribadi pengguna.

## Isi aplikasi

166 pelajaran N5–N3, 26 evaluasi unit, 890 soal latihan, 60 soal evaluasi akhir, dan 533 berkas audio. Materi tambahan masih draf tinjauan pengajar. Nilai bukan skor resmi JLPT. Kaiwa adalah demo aturan lokal, bukan AI percakapan bebas. Tidak ada permintaan ke API AI atau database untuk menyimpan latihan.

Audio sintetis Mei / MMDAgent Project Team, CC BY 3.0; atribusi ada pada pemutar dan `docs/licenses/Mei-voice.txt`. Materi/audio harus dimuat dari situs; versi ini belum merupakan PWA dengan jaminan akses tanpa internet. Font memakai Google Fonts.

## Menjalankan di komputer

Node.js 22.x:

```sh
npm ci
npm run dev
```

Tidak perlu berkas `.env`. Untuk memeriksa hasil produksi:

```sh
npm test
npm run build
npm run typecheck
node tests/static-smoke.mjs
npm start
```

`npm start` menyajikan folder statis `out/` pada http://127.0.0.1:3000. Seluruh isi `out/` juga dapat dipasang pada hosting statis lain. Folder `out/`, `.next`, `node_modules`, dan data pengujian tidak perlu diunggah ke GitHub.

Lihat `docs/VERIFIKASI-BROWSER.md` untuk hasil pemeriksaan paket.
