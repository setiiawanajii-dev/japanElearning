import type {Lesson,Question} from '../types';
// Written form | reading | Indonesian meaning | original context | full reading | translation.
const groups=[
['N5','02 · Diri dan benda','family','Keluarga dan orang di sekitar',`
父|ちち|ayah saya|父は会社員です。|ちちはかいしゃいんです。|Ayah saya karyawan perusahaan.
母|はは|ibu saya|母は先生です。|はははせんせいです。|Ibu saya guru.
兄|あに|kakak laki-laki saya|兄は学生です。|あにはがくせいです。|Kakak laki-laki saya mahasiswa.
姉|あね|kakak perempuan saya|姉は東京にいます。|あねはとうきょうにいます。|Kakak perempuan saya berada di Tokyo.
弟|おとうと|adik laki-laki saya|弟は十歳です。|おとうとはじゅっさいです。|Adik laki-laki saya berumur sepuluh tahun.
妹|いもうと|adik perempuan saya|妹は学校にいます。|いもうとはがっこうにいます。|Adik perempuan saya berada di sekolah.
子供|こども|anak|公園に子供がいます。|こうえんにこどもがいます。|Ada anak di taman.
友達|ともだち|teman|友達と映画を見ます。|ともだちとえいがをみます。|Saya menonton film bersama teman.
`],
['N5','02 · Diri dan benda','home','Rumah dan benda sehari-hari',`
家|いえ|rumah|私の家は駅の近くです。|わたしのいえはえきのちかくです。|Rumah saya dekat stasiun.
机|つくえ|meja|机の上に本があります。|つくえのうえにほんがあります。|Ada buku di atas meja.
椅子|いす|kursi|椅子の下に猫がいます。|いすのしたにねこがいます。|Ada kucing di bawah kursi.
窓|まど|jendela|窓を開けてください。|まどをあけてください。|Tolong buka jendela.
鍵|かぎ|kunci|鍵は鞄の中です。|かぎはかばんのなかです。|Kunci ada di dalam tas.
時計|とけい|jam|この時計は新しいです。|このとけいはあたらしいです。|Jam ini baru.
電話|でんわ|telepon|電話はそこにあります。|でんわはそこにあります。|Telepon ada di situ.
庭|にわ|halaman rumah|庭に花があります。|にわにはながあります。|Ada bunga di halaman rumah.
`],
['N5','03 · Waktu dan jumlah','time','Waktu, hari, dan bulan',`
午前|ごぜん|pagi sebelum tengah hari|授業は午前九時からです。|じゅぎょうはごぜんくじからです。|Pelajaran mulai pukul sembilan pagi.
午後|ごご|setelah tengah hari|午後三時に会いましょう。|ごごさんじにあいましょう。|Mari bertemu pukul tiga sore.
今週|こんしゅう|minggu ini|今週は忙しいです。|こんしゅうはいそがしいです。|Minggu ini saya sibuk.
来週|らいしゅう|minggu depan|来週、日本へ行きます。|らいしゅう、にほんへいきます。|Minggu depan saya pergi ke Jepang.
先月|せんげつ|bulan lalu|先月、京都へ行きました。|せんげつ、きょうとへいきました。|Bulan lalu saya pergi ke Kyoto.
来月|らいげつ|bulan depan|来月は休みです。|らいげつはやすみです。|Bulan depan saya libur.
土曜日|どようび|Sabtu|土曜日に泳ぎます。|どようびにおよぎます。|Saya berenang pada hari Sabtu.
日曜日|にちようび|Minggu|日曜日は働きません。|にちようびははたらきません。|Saya tidak bekerja pada hari Minggu.
`],
['N5','04 · Kegiatan sehari-hari','actions','Kegiatan dari pagi sampai malam',`
起きる|おきる|bangun|毎日六時に起きる。|まいにちろくじにおきる。|Saya bangun pukul enam setiap hari (ragam biasa).
寝る|ねる|tidur|毎晩十一時に寝る。|まいばんじゅういちじにねる。|Saya tidur pukul sebelas setiap malam (ragam biasa).
行く|いく|pergi|明日学校へ行く。|あしたがっこうへいく。|Besok saya pergi ke sekolah (ragam biasa).
帰る|かえる|pulang|六時に家へ帰る。|ろくじにいえへかえる。|Saya pulang ke rumah pukul enam (ragam biasa).
聞く|きく|mendengarkan|夜、音楽を聞く。|よる、おんがくをきく。|Saya mendengarkan musik malam hari (ragam biasa).
買う|かう|membeli|店でパンを買う。|みせでパンをかう。|Saya membeli roti di toko (ragam biasa).
待つ|まつ|menunggu|駅で友達を待つ。|えきでともだちをまつ。|Saya menunggu teman di stasiun (ragam biasa).
休む|やすむ|beristirahat|今日は家で休む。|きょうはいえでやすむ。|Hari ini saya beristirahat di rumah (ragam biasa).
`],
['N5','05 · Sifat dan kesukaan','descriptions','Sifat yang sering dipakai',`
大きい|おおきい|besar|この犬は大きいです。|このいぬはおおきいです。|Anjing ini besar.
小さい|ちいさい|kecil|私の部屋は小さいです。|わたしのへやはちいさいです。|Kamar saya kecil.
長い|ながい|panjang|この道は長いです。|このみちはながいです。|Jalan ini panjang.
短い|みじかい|pendek|この鉛筆は短いです。|このえんぴつはみじかいです。|Pensil ini pendek.
新しい|あたらしい|baru|新しい靴を買いました。|あたらしいくつをかいました。|Saya membeli sepatu baru.
古い|ふるい|lama atau tua untuk benda|あれは古い建物です。|あれはふるいたてものです。|Itu bangunan tua.
忙しい|いそがしい|sibuk|今日は忙しいです。|きょうはいそがしいです。|Hari ini saya sibuk.
楽しい|たのしい|menyenangkan|日本語の勉強は楽しいです。|にほんごのべんきょうはたのしいです。|Belajar bahasa Jepang menyenangkan.
`],
['N5','06 · Keinginan dan ajakan','shopping','Belanja dan pakaian',`
服|ふく|pakaian|新しい服が欲しいです。|あたらしいふくがほしいです。|Saya ingin pakaian baru.
靴|くつ|sepatu|この靴はいくらですか。|このくつはいくらですか。|Berapa harga sepatu ini?
帽子|ぼうし|topi|白い帽子を買いました。|しろいぼうしをかいました。|Saya membeli topi putih.
赤い|あかい|merah|赤い鞄をください。|あかいかばんをください。|Tolong tas merah itu.
青い|あおい|biru|青い服が好きです。|あおいふくがすきです。|Saya suka pakaian biru.
白い|しろい|putih|白い靴を見せてください。|しろいくつをみせてください。|Tolong perlihatkan sepatu putih.
黒い|くろい|hitam|これは黒い時計です。|これはくろいとけいです。|Ini jam hitam.
お金|おかね|uang|お金は財布の中です。|おかねはさいふのなかです。|Uang ada di dalam dompet.
`],
['N4','03 · Kemampuan dan persiapan','services','Pelayanan dan persiapan perjalanan',`
予約|よやく|reservasi|ホテルの予約をしました。|ホテルのよやくをしました。|Saya membuat reservasi hotel.
受付|うけつけ|meja penerimaan|受付で名前を伝えてください。|うけつけでなまえをつたえてください。|Tolong sampaikan nama di meja penerimaan.
住所|じゅうしょ|alamat|ここに住所を書いてください。|ここにじゅうしょをかいてください。|Tolong tulis alamat di sini.
番号|ばんごう|nomor|電話の番号を教えてください。|でんわのばんごうをおしえてください。|Tolong beri tahu nomor telepon.
荷物|にもつ|barang bawaan|荷物を預けてもいいですか。|にもつをあずけてもいいですか。|Bolehkah saya menitipkan barang bawaan?
切符|きっぷ|tiket|駅で切符を買っておきます。|えきできっぷをかっておきます。|Saya akan membeli tiket terlebih dahulu di stasiun.
乗り換え|のりかえ|pergantian kendaraan|この駅で乗り換えが必要です。|このえきでのりかえがひつようです。|Perlu berganti kendaraan di stasiun ini.
忘れ物|わすれもの|barang tertinggal|忘れ物を取りに戻りました。|わすれものをとりにもどりました。|Saya kembali untuk mengambil barang yang tertinggal.
`],
['N4','08 · Keadaan dan hubungan','daily-problems','Keadaan dan masalah sehari-hari',`
故障|こしょう|kerusakan mesin|故障のため、エレベーターが使えません。|こしょうのため、エレベーターがつかえません。|Lift tidak dapat dipakai karena kerusakan.
修理|しゅうり|perbaikan|自転車の修理をお願いしました。|じてんしゃのしゅうりをおねがいしました。|Saya meminta perbaikan sepeda.
連絡|れんらく|pemberitahuan atau kontak|遅れるときは連絡してください。|おくれるときはれんらくしてください。|Tolong hubungi kami jika terlambat.
都合|つごう|ketersediaan waktu|明日は都合が悪いです。|あしたはつごうがわるいです。|Besok saya tidak bisa menyesuaikan jadwal.
用事|ようじ|urusan|用事があるので、先に帰ります。|ようじがあるので、さきにかえります。|Karena ada urusan, saya pulang lebih dahulu.
約束|やくそく|janji|友達との約束を忘れてしまいました。|ともだちとのやくそくをわすれてしまいました。|Saya terlanjur lupa janji dengan teman.
間違い|まちがい|kesalahan|この文に間違いがあります。|このぶんにまちがいがあります。|Ada kesalahan dalam kalimat ini.
説明|せつめい|penjelasan|もう一度説明をお願いします。|もういちどせつめいをおねがいします。|Mohon penjelasan sekali lagi.
`],
['N3','08 · Bahasa kerja dan wacana','work-context','Komunikasi kerja dalam konteks',`
確認|かくにん|pemeriksaan atau konfirmasi|内容を確認してから返信します。|ないようをかくにんしてからへんしんします。|Saya membalas setelah memeriksa isinya.
返信|へんしん|balasan|金曜日までに返信をお願いします。|きんようびまでにへんしんをおねがいします。|Mohon balasan paling lambat Jumat.
調整|ちょうせい|penyesuaian|会議の日程を調整しています。|かいぎのにっていをちょうせいしています。|Kami sedang menyesuaikan jadwal rapat.
相談|そうだん|konsultasi|上司に相談することにしました。|じょうしにそうだんすることにしました。|Saya memutuskan berkonsultasi dengan atasan.
報告|ほうこく|laporan|結果の報告が遅れてしまいました。|けっかのほうこくがおくれてしまいました。|Laporan hasil terlanjur terlambat.
資料|しりょう|bahan atau dokumen|会議の資料を準備しておきました。|かいぎのしりょうをじゅんびしておきました。|Saya sudah menyiapkan dokumen rapat.
日程|にってい|jadwal kegiatan|日程が決まり次第、ご連絡します。|にっていがきまりしだい、ごれんらくします。|Kami akan menghubungi segera setelah jadwal ditetapkan.
手順|てじゅん|urutan langkah|作業の手順を確認しましょう。|さぎょうのてじゅんをかくにんしましょう。|Mari periksa urutan langkah pekerjaannya.
`],
['N3','09 · Makna dan penilaian','reasoning-context','Memahami argumen dan informasi',`
原因|げんいん|penyebab|遅れの原因を調べています。|おくれのげんいんをしらべています。|Kami sedang menyelidiki penyebab keterlambatan.
結果|けっか|hasil|努力した結果、合格できました。|どりょくしたけっか、ごうかくできました。|Sebagai hasil usaha, saya berhasil lulus.
目的|もくてき|tujuan|この活動の目的を説明します。|このかつどうのもくてきをせつめいします。|Saya menjelaskan tujuan kegiatan ini.
方法|ほうほう|cara atau metode|もっと簡単な方法があるはずです。|もっとかんたんなほうほうがあるはずです。|Seharusnya ada cara yang lebih mudah.
条件|じょうけん|syarat|条件によって料金が変わります。|じょうけんによってりょうきんがかわります。|Tarif berubah menurut syaratnya.
可能性|かのうせい|kemungkinan|予定が変わる可能性があります。|よていがかわるかのうせいがあります。|Ada kemungkinan jadwal berubah.
共通|きょうつう|kesamaan|二つの意見には共通の点があります。|ふたつのいけんにはきょうつうのてんがあります。|Ada poin yang sama dalam kedua pendapat.
具体的|ぐたいてき|konkret atau spesifik|具体的な例を挙げてください。|ぐたいてきなれいをあげてください。|Tolong berikan contoh yang konkret.
`]
];
export const contextWords:Lesson[]=groups.map(([level,unit,id,title,raw])=>{
 const words=raw.trim().split('\n').map(l=>l.split('|'));
 const questions:Question[]=words.flatMap((w,i)=>[
 {id:'read-'+i,kind:'text',prompt:'Baca kata dalam konteks: '+w[3]+' → '+w[0],answers:w[0]==='十分'?['じゅっぷん','じっぷん']:[w[1]],explanation:w[0]+' dibaca '+w[1]+'. '+w[5]},
 {id:'context-'+i,kind:'choice',prompt:'Lengkapi sesuai makna: '+w[5]+'\n'+w[3].replace(w[0],'＿＿'),options:[words[(i+2)%8][0],w[0],words[(i+5)%8][0],words[(i+7)%8][0]],answers:[w[0]],explanation:w[0]+' ('+w[1]+') berarti '+w[2]+'. '+w[3]}
 ]);
 return {id:level.toLowerCase()+'-context-'+id,level,unit,title,subtitle:'Bacaan dan penggunaan delapan kata dalam konteks',minutes:25,goal:'Membaca delapan kata dan memilihnya sesuai maksud kalimat.',explanation:'Pelajari kata sebagai satu kesatuan: tulisan, bacaan, makna, dan kalimat. Bacaan kanji dapat berubah menurut kata. '+(id==='family'?'Kata keluarga 父・母・兄・姉 dipakai untuk keluarga sendiri ketika berbicara kepada orang luar; panggilan keluarga orang lain berbeda. ':'')+'Bentuk verba kamus dalam contoh diberi label ragam biasa.',examples:words.map(w=>({jp:w[3],reading:w[4],romaji:'',id:w[5]})),vocabulary:words.map(w=>({jp:w[0],reading:w[1],id:w[2]})),guided:'Baca dua contoh pertama dengan furigana. Tutup bacaannya dan coba lagi. Sebutkan makna seluruh kalimat, lalu gantilah satu kata dengan kata lain yang tetap masuk akal. Kerjakan soal bacaan dahulu dan soal konteks sesudahnya.',summary:'Ingat kata dalam konteks dan ragam kalimatnya. Jangan menganggap satu kanji selalu memiliki satu bunyi.',questions,status:'draft',reviewStatus:'needs-review',skill:'vocabulary',scenarioId:level.toLowerCase()+'-'+unit.slice(0,2),production:{prompt:'Tulis dua kalimat memakai dua kata dari pelajaran ini, lalu bandingkan bentuk dan maknanya dengan contoh.',model:words[0][3]+' '+words[1][3],checklist:['Kata dipakai sesuai makna.','Bentuk sopan atau biasa dipilih dengan sengaja.','Saya dapat membaca kalimat tanpa membuka bacaan.']}};
});
