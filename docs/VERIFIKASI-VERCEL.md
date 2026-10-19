# Pemeriksaan paket GitHub / Vercel

Paket terpisah dari aplikasi lokal lama. Target: satu pemilik, satu kata sandi, Next.js 16.4.2, Node.js 22.x, database libSQL/Turso.

## Pemeriksaan otomatis

- 16 pengujian lulus: 10 kurikulum/pengulangan, 3 evaluasi/audio, 3 autentikasi/database/asal permintaan.
- Kata sandi salah ditolak; sesi diubah, kedaluwarsa, atau setelah rotasi kata sandi ditolak.
- Adapter database menyiapkan tabel, mengikat parameter, dan membatalkan seluruh batch ketika salah satu penulisan gagal.
- Database file lokal ditolak ketika lingkungan Vercel aktif.
- Pemeriksaan asal permintaan memakai HTTP Host aktual, karena Next.js menormalkan alamat loopback pada URL internal. Permintaan lintas asal dan HTTP pada Vercel ditolak.
- Paket mengandung 533 WAV; pemeriksaan memastikan stimulus menyimak tersedia sebagai berkas PCM.
- Dependensi dikunci dengan package-lock.json; seluruh URL paket berasal dari registry npm resmi.

## Batas verifikasi

Paket belum diunggah ke GitHub atau diterbitkan ke Vercel. Tidak ada koneksi ke akun Turso nyata milik pengguna. Pengujian penyimpanan memakai libSQL lokal dengan schema yang sama; koneksi cloud memerlukan URL dan token yang valid dari pengguna.

Progres pengguna dari D1 lokal tidak dipindahkan. Database sementara pengujian, node_modules, hasil build, kata sandi, token, dan konfigurasi lokal tidak disertakan dalam ZIP.

## Hasil build dan server produksi lokal

`npm run build` berhasil pada Next.js 16.4.2, termasuk pemeriksaan TypeScript. Route `/`, `/login`, `/api/auth/login`, `/api/auth/logout`, `/api/learning`, dan `/api/assessment` terdaftar.

`node tests/server-smoke.mjs` lulus pada hasil build tersebut: login benar/salah, cookie HttpOnly/Secure/SameSite, akses API tanpa sesi, penolakan lintas asal, pembatasan percobaan login, penyimpanan profil, penilaian jawaban, kaiwa demo, riwayat evaluasi, pengambilan audio, dan keluar akun. Pengujian menggunakan database serta kata sandi acak sementara; server uji dihentikan setelah selesai.

Tidak ada pengujian visual browser baru untuk versi Vercel dalam paket ini. Pengujian di atas memeriksa server produksi dan perilaku API; pengujian visual aplikasi lokal sebelumnya tetap terpisah.
