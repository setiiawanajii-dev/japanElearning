# Verifikasi versi tanpa login

Tanggal: 19 Oktober 2026.

- Instalasi bersih npm ci berhasil.
- 20 pengujian otomatis lulus: kurikulum, penilaian, audio, progres lokal, pengulangan, evaluasi akhir, cadangan, dan penanganan kegagalan penyimpanan.
- Pemeriksaan TypeScript lulus.
- Build produksi statis Next.js berhasil.
- Uji HTTP hasil build: halaman utama dan audio berhasil; /login dan /api/learning menghasilkan 404 sesuai rancangan.
- Uji browser lokal: onboarding tanpa login berhasil; nama profil tetap tampil setelah muat ulang; jawaban latihan kana dinilai benar; pengaturan menampilkan fasilitas cadangan dan informasi penyimpanan browser.

Batas verifikasi: belum diunggah atau diuji pada domain Vercel. Pengujian browser tidak mencakup seluruh soal secara manual; konsistensi materi dan jawaban diperiksa oleh pengujian otomatis. Materi tetap berstatus draf tinjauan pengajar. Kaiwa menggunakan aturan lokal, bukan layanan AI.

Data tersimpan di browser pada domain yang sedang dibuka. Perangkat/browser/domain lain memiliki data terpisah. Gunakan ekspor/impor cadangan untuk memindahkan data. Data versi database lama tidak otomatis dipindahkan.
