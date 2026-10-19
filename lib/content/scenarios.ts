import type {Scenario} from '../types';
// Skenario demo: mendeteksi pola yang ditulis, bukan menilai kefasihan.
const rows=[
['N5','01','Minta pengulangan','Di kelas','Minta kata diulang dengan pelan.','もう一度言いましょうか。','Perlu saya ulangi sekali lagi?','はい、ゆっくりお願いします。','ゆっくり|もう一度|お願いします','はい。ゆっくり話します。'],
['N5','02','Kenalan dan benda milikmu','Di kelas','Perkenalkan diri dan sebutkan pemilik sebuah buku.','はじめまして。この本は誰のですか。','Salam kenal. Buku ini milik siapa?','リナです。その本は私のです。','です|私の|わたしの','そうですか。よろしくお願いします。'],
['N5','03','Menentukan waktu','Di stasiun','Usulkan waktu bertemu dan pastikan jumlah orang.','明日、何時に会いましょうか。','Besok, kita bertemu pukul berapa?','十一時に会いましょう。','時|じに|会いましょう','いいですね。何人で来ますか。'],
['N5','04','Cerita kegiatan harian','Dengan teman','Sebutkan kegiatan, tempat, dan kendaraan.','毎朝、何時に起きますか。','Setiap pagi bangun jam berapa?','六時に起きます。電車で会社へ行きます。','起き|おき|行き|いき','そうですか。会社で何をしますか。'],
['N5','05','Memilih barang','Di toko','Tanyakan harga dan jelaskan pilihan.','どの鞄が好きですか。','Tas yang mana yang Anda sukai?','白い鞄が好きです。いくらですか。','好き|すき|いくら','白い鞄は二千円です。どうしますか。'],
['N5','06','Mengajak makan','Dengan teman','Ajukan kegiatan dan responsi ajakan dengan sopan.','土曜日は何をしたいですか。','Sabtu ingin melakukan apa?','一緒にご飯を食べませんか。','ませんか|たい|ましょう','いいですね。どこで食べましょうか。'],
['N5','07','Menjelaskan urutan','Di rumah','Sebutkan kegiatan sebelum dan sesudah makan.','ご飯を食べる前に何をしますか。','Apa yang dilakukan sebelum makan?','手を洗います。','洗|あら|前に','食べた後で、何をしますか。'],
['N5','08','Memilih perjalanan','Merencanakan jalan-jalan','Bandingkan dua pilihan dan beri alasan.','バスと電車と、どちらがいいですか。','Lebih baik bus atau kereta?','電車がいいです。バスより速いですから。','より|から|のほう','分かりました。何時に出かけましょうか。'],
['N5','09','Memastikan arah','Di perpustakaan','Tanyakan lokasi dan konfirmasi informasi.','何かお探しですか。','Sedang mencari sesuatu?','出口はどこですか。','どこ|どちら|もう一度','出口は右です。分かりましたか。'],
['N4','01','Meminta izin','Di kantor','Minta izin dan pahami batasannya.','この資料をどうしたいですか。','Apa yang ingin Anda lakukan dengan dokumen ini?','コピーしてもいいですか。','てもいい|もらえ|いただけ','はい。ただし、外へ持っていかないでください。'],
['N4','02','Cerita pengalaman','Dengan teman','Ceritakan pengalaman dan kebiasaan baru.','日本へ行ったことがありますか。','Pernah ke Jepang?','はい、一度行ったことがあります。','ことがあり|ことがない|ことがありません','どんなことをしましたか。'],
['N4','03','Persiapan acara','Di tempat kerja','Jelaskan persiapan yang sudah atau belum selesai.','明日の準備はどうですか。','Bagaimana persiapan besok?','資料は印刷してあります。','てあり|ておき|まだ|もう','ありがとうございます。部屋の予約はどうですか。'],
['N4','04','Membuat rencana','Dengan teman','Sebutkan rencana dan alasan keputusan.','来年は何をするつもりですか。','Tahun depan berniat melakukan apa?','日本へ留学するつもりです。','つもり|予定|ことに','そのために、どんな準備をしていますか。'],
['N4','05','Saat perjalanan terganggu','Lewat telepon','Jelaskan hambatan dan usulkan tindakan berikutnya.','今、どこにいますか。間に合いそうですか。','Sekarang di mana? Sepertinya sempat tiba?','電車が止まっているので、遅れます。','ので|から|たら|遅れ','分かりました。着いたら連絡してください。'],
['N4','06','Menerima bantuan','Setelah pindahan','Ucapkan terima kasih dan sebut bantuan yang diterima.','引っ越しは無事に終わりましたか。','Apakah pindahannya selesai dengan baik?','はい。手伝ってくれて、ありがとうございました。','くれて|もら|ありがとう','よかったです。新しい家はどうですか。'],
['N4','07','Menyampaikan pesan','Di kantor','Laporkan ucapan dan titipkan pesan.','田中さんは何と言っていましたか。','Apa yang dikatakan Tanaka?','三時に戻ると言っていました。','と言|とい|伝え','では、戻ったら連絡するように伝えてください。'],
['N4','08','Melaporkan masalah kamar','Kepada pengelola','Jelaskan keadaan benda dan minta pemeriksaan.','部屋のどこに問題がありますか。','Bagian mana dari kamar yang bermasalah?','エアコンが動きません。確認してもらえますか。','動きません|壊れ|もらえ|いただけ','分かりました。明日は何時まで家にいますか。'],
['N3','01','Perubahan kemampuan','Dengan teman','Jelaskan perkembangan dan kesulitan yang masih ada.','最近、できるようになったことはありますか。','Belakangan ada hal yang sudah mulai bisa dilakukan?','日本語で日記が書けるようになってきました。','ように|てき|ていき','それはいいですね。まだ難しいことは何ですか。'],
['N3','02','Memilih tempat tinggal','Dengan rekan','Bandingkan pilihan dan jelaskan prioritas.','部屋を選ぶとき、何を重視しますか。','Saat memilih kamar, apa yang diutamakan?','駅からの距離より、静かさを重視します。','より|比べ|わりに|重視','なるほど。買い物の便利さについてはどう思いますか。'],
['N3','03','Memastikan sebuah kabar','Dengan rekan','Sebut sumber informasi dan bedakan kabar dari fakta.','イベントが中止という話は本当ですか。','Apakah kabar acara dibatalkan itu benar?','友達から聞きましたが、公式のお知らせを確認します。','によると|そう|らしい|確認','ありがとうございます。確認できたら教えてください。'],
['N3','04','Menjelaskan akibat','Dalam diskusi','Jelaskan sebab dan hasil dengan penilaian yang sesuai.','今回、うまくいった理由は何だと思いますか。','Menurut Anda, mengapa kali ini berjalan baik?','皆さんが協力してくれたおかげだと思います。','おかげ|ため|ので|と思','そうですね。次はどこを改善したいですか。'],
['N3','05','Memberi kabar progres','Di tempat kerja','Jelaskan tahap pekerjaan dan langkah berikutnya.','報告書はどこまでできていますか。','Laporan sudah sampai tahap mana?','今、数字を確認しているところです。','ところ|ばかり|てから|た後','分かりました。確認が終わったら知らせてください。'],
['N3','06','Menyampaikan tujuan','Dalam diskusi','Nyatakan tujuan dan cara mencapainya.','その方法を選んだのはなぜですか。','Mengapa memilih metode itu?','忘れないように、毎日復習できる方法を選びました。','ように|ために|ければ|れば','効果があったかどうか、どうやって確認しますか。'],
['N3','07','Meminta kesempatan','Kepada atasan','Minta izin bertindak sendiri dengan sopan.','この件について、今決められますか。','Apakah hal ini dapat diputuskan sekarang?','申し訳ありません。少し考えさせていただけませんか。','させて|いただけ|させてもら','分かりました。いつまでに返事ができますか。'],
['N3','08','Menjadwalkan ulang rapat','Dengan mitra kerja','Minta perubahan jadwal dan tawarkan alternatif.','明日の打ち合わせは二時でよろしいですか。','Apakah rapat besok pukul dua cocok?','申し訳ありませんが、四時に変更していただけないでしょうか。','いただけ|でしょうか|伺|変更','確認いたします。資料は予定どおりお送りいただけますか。'],
['N3','09','Menyampaikan keberatan','Dalam rapat','Tanggapi pendapat dengan alasan tanpa menyerang orangnya.','このまま進めてもよいと思いますか。','Menurut Anda, bolehkah melanjutkan seperti ini?','早い方法ですが、安全性を確認せずに進めるわけにはいきません。','わけ|べき|しかし|ただ','なるほど。具体的に何を確認するべきだと思いますか。']
];
export const unitScenarios:Scenario[]=rows.map(([level,u,title,place,goal,opening,reading,hint,patterns,followup])=>({id:level.toLowerCase()+'-'+u,level,title,place,goal,opening,reading,hint,patterns:patterns.split('|'),followup,icon:level==='N5'?'🌱':level==='N4'?'🏡':'💬',feedback:'Periksa kesesuaian pola dengan tujuan skenario. Contoh ungkapan: '+hint}));
