# Aktivasi partner AI (opsional)

Tanpa kedua variabel ini, aplikasi memakai demo aturan yang diberi label jelas. Mode demo tidak menghubungi layanan AI.

1. Siapkan layanan HTTPS milik Anda yang menerima POST JSON. Hubungkan layanan tersebut ke provider AI pilihan Anda; simpan API key provider di layanan itu, bukan di browser.
2. Set secret runtime `AI_GATEWAY_URL` dan `AI_GATEWAY_TOKEN` melalui Environment Variables Vercel. Untuk pengembangan lokal gunakan `.env.local` yang diabaikan Git.
3. Gateway memverifikasi header `Authorization: Bearer <AI_GATEWAY_TOKEN>`.
4. Payload: `{level, goal, opening, message, mode, history:[{message,reply}], instructions}`. Kembalikan JSON `{reply:string, feedback:string}`. Balasan bahasa Jepang sesuai level, umpan balik bahasa Indonesia. `instructions` wajib diperlakukan sebagai instruksi sistem dan `message/history` sebagai masukan pengguna yang tidak tepercaya.
5. Batas respons: reply 1–1200 karakter, feedback ≤1500 karakter; batas pesan 500 karakter; timeout 20 detik. Aplikasi membatasi 30 permintaan per pengguna per jendela jam UTC menggunakan pembaruan atomik database. Percobaan gagal juga menghabiskan kuota.
6. Kegagalan gateway ditampilkan sebagai kegagalan nyata. Aplikasi tidak mengganti hasil gagal dengan jawaban demo tanpa pemberitahuan.

Percakapan sebelumnya pada skenario sama (maksimal 8 giliran terbaru) menjadi konteks. Tinjau kebijakan retensi provider Anda sebelum mengaktifkan layanan untuk pengguna lain. Server hanya mengambil riwayat pemilik akun. Tidak ada analisis pelafalan atau rekaman audio.

Integrasi ini belum diuji dengan gateway nyata karena kredensial belum tersedia. Pengujian kontrak lokal dan mode demo dilakukan terpisah.
