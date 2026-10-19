import {grade,lessons,type Question} from './curriculum';
export type ExamSkill='vocabulary'|'grammar'|'reading'|'listening';
export type ExamQuestion=Question&{skill:ExamSkill;lessonId:string};
export const examVersion='2026-10-v1';
export const examSkillNames:Record<ExamSkill,string>={vocabulary:'Kosakata & kanji',grammar:'Tata bahasa',reading:'Membaca',listening:'Menyimak'};
function q(id:string,skill:ExamSkill,lessonId:string,prompt:string,correct:string,wrong:string[],explanation:string,stimulus?:string):ExamQuestion{
 const opts=[correct,...wrong],offset=[...id].reduce((sum,char)=>sum+char.charCodeAt(0),0)%4;
 return {id,kind:'choice',skill,lessonId,prompt,options:[...opts.slice(offset),...opts.slice(0,offset)],answers:[correct],explanation,...(stimulus?(skill==='listening'?{audio:stimulus}:{passage:stimulus}):{})};
}
const n5Read='図書館は午前九時から午後六時までです。水曜日は休みです。本は三冊まで、二週間借りることができます。土曜日と日曜日も開いています。';
const n5Read2='田中さんへ。明日は一緒に昼ご飯を食べませんか。十二時に学校の前で会いましょう。私は午後二時から仕事ですから、一時半に帰ります。山田';
const n5Listen='Ａ：明日、何時に会いますか。Ｂ：九時はどうですか。Ａ：九時は仕事です。十時はどうですか。Ｂ：いいですよ。駅の前で会いましょう。';
const n5Listen2='店員：何にしますか。客：お茶を二つください。店員：ケーキはいかがですか。客：いいえ、お茶だけでお願いします。';
const n4Read='日曜日の料理教室に参加する方へ。材料はこちらで用意しますので、買ってこなくてもいいです。エプロンは持ってきてください。会場は二階から三階に変わりました。開始時刻は予定どおり午前十時です。';
const n4Read2='昨日借りた本は、金曜日までに返すことになっています。でも、金曜日は仕事で行けません。木曜日は図書館が休みなので、水曜日の夕方に返しに行くつもりです。';
const n4Listen='Ａ：コピーをお願いしてもいいですか。Ｂ：はい。十枚でいいですか。Ａ：すみません。参加者が増えたので、十五枚お願いします。Ｂ：分かりました。資料を配るのはどうしますか。Ａ：それは私がします。';
const n4Listen2='Ａ：週末、山へ行きませんか。Ｂ：雨が降ったらどうしますか。Ａ：そのときは美術館にしましょう。Ｂ：美術館は今週休みですよ。Ａ：では、雨だったら家で映画を見ましょう。Ｂ：いいですね。';
const n3Read='来月から、会議室の予約は利用日の七日前までにお願いします。以前は三日前まで受け付けていましたが、準備時間を確保するため変更します。ただし、すでに予約済みの方は手続きをやり直す必要はありません。料金や利用時間の変更はありません。';
const n3Read2='便利な道具を使えば、必ず仕事が速くなるわけではありません。使い方を覚える時間も必要です。しかし、一度慣れれば、同じ作業を何度も行う場合には役立つでしょう。導入するかどうかは、値段だけでなく、作業の内容も考えて決めるべきです。';
const n3Listen='Ａ：新しい企画は、若い人向けにしたほうがいいと思います。Ｂ：でも、調査によると、今の利用者は年齢が幅広いそうです。Ａ：それなら、年齢だけで対象を決めるわけにはいきませんね。Ｂ：はい。まず、利用目的を調べてから考えましょう。';
const n3Listen2='Ａ：この資料、今日中に完成させるのは難しそうです。Ｂ：提出は明後日ですから、今日全部終わらせることはありません。ただ、明日の会議で数字を使うので、その部分だけは今日確認してください。Ａ：分かりました。数字を先に確認します。';
export const examBanks:Record<string,ExamQuestion[]>={
N5:[
 q('n5-v1','vocabulary','n5-context-family','Pilih bacaan 母 dalam 母は先生です。','はは',['ちち','あね','いもうと'],'母 untuk ibu sendiri dibaca はは.'),
 q('n5-v2','vocabulary','n5-context-time','Pilih kata untuk “minggu depan”.','来週',['今週','先週','来月'],'来週（らいしゅう）berarti minggu depan.'),
 q('n5-v3','vocabulary','n5-context-descriptions','Jalan ini tidak panjang. Kata yang sesuai adalah …','短い',['長い','高い','新しい'],'短い berarti pendek, lawan 長い.'),
 q('n5-v4','vocabulary','n5-context-shopping','Pilih bacaan 白い.','しろい',['くろい','あかい','あおい'],'白い（しろい）berarti putih.'),
 q('n5-g1','grammar','n5-location','庭に犬が＿＿。','います',['あります','です','します'],'Anjing adalah makhluk hidup sehingga memakai います.'),
 q('n5-g2','grammar','n5-action-place','駅＿＿新聞を買います。','で',['に','へ','が'],'Tempat kegiatan membeli ditandai で.'),
 q('n5-g3','grammar','n5-noun-past','昨日は日曜日＿＿。 Pilih lampau positif.','でした',['ます','ですから','ではありません'],'Nomina lampau sopan memakai でした.'),
 q('n5-g4','grammar','n5-i-adjective','この料理はあまり＿＿。 Maksudnya tidak begitu mahal.','高くないです',['高いです','高かったです','高いではありません'],'あまり dengan negatif; 高い menjadi 高くない.'),
 q('n5-g5','grammar','n5-verb-groups','Pilih bentuk sopan 帰る.','帰ります',['帰ます','帰れます','帰らます'],'帰る golongan I, bukan II.'),
 q('n5-g6','grammar','n5-request-basic','少し＿＿ください。 Dari 待つ.','待って',['待て','待ち','待った'],'待つ→待って; permintaan memakai てください.'),
 q('n5-g7','grammar','n5-purpose','牛乳を＿＿に行きます。','買い',['買う','買って','買った'],'Tujuan perjalanan memakai batang ます + に.'),
 q('n5-g8','grammar','n5-indefinite','今日は＿＿食べませんでした。 Maksudnya tidak makan apa pun.','何も',['何か','いつも','どこか'],'何も dengan negatif berarti tidak makan apa pun.'),
 q('n5-r1','reading','n5-read-notice','Hari apa perpustakaan tutup?','水曜日',['土曜日','日曜日','金曜日'],'水曜日は休みです menyebut hari tutup.',n5Read),
 q('n5-r2','reading','n5-read-notice','Berapa lama buku boleh dipinjam?','二週間',['三週間','一週間','六時間'],'二週間 adalah lama peminjaman; 三冊 jumlah buku.',n5Read),
 q('n5-r3','reading','n5-read-invite','Kapan mereka bertemu?','十二時',['一時半','二時','十時'],'十二時に学校の前で会いましょう menyatakan janji.',n5Read2),
 q('n5-r4','reading','n5-read-invite','Mengapa Yamada pulang pukul setengah dua?','Karena bekerja mulai pukul dua',['Karena sekolah tutup','Karena makan siang pukul dua','Karena tidak ingin bertemu'],'仕事ですから memberi alasan pulang.',n5Read2),
 q('n5-l1','listening','n5-listen-time','Waktu pertemuan yang disepakati?','十時',['九時','十一時','八時'],'Usulan sembilan ditolak; sepuluh disetujui.',n5Listen),
 q('n5-l2','listening','n5-listen-time','Tempat pertemuan?','駅の前',['会社の中','学校の前','家の中'],'Kalimat terakhir menetapkan 駅の前.',n5Listen),
 q('n5-l3','listening','n5-listen-order','Apa yang dipesan?','お茶二つ',['お茶一つ','ケーキ二つ','コーヒー二つ'],'Pelanggan meminta お茶を二つ.',n5Listen2),
 q('n5-l4','listening','n5-listen-order','Apakah kue termasuk pesanan?','Tidak, hanya teh',['Ya, dua kue','Ya, satu kue','Pesanan belum diputuskan'],'いいえ、お茶だけ membatasi pesanan.',n5Listen2)
],
N4:[
 q('n4-v1','vocabulary','n4-context-services','Pilih bacaan 受付.','うけつけ',['うけとり','うけもち','うけこたえ'],'受付（うけつけ）adalah penerimaan atau meja resepsi.'),
 q('n4-v2','vocabulary','n4-context-services','Apa arti 乗り換え dalam perjalanan?','Berganti kendaraan',['Membeli oleh-oleh','Kehilangan tiket','Memesan makanan'],'乗り換え adalah perpindahan kendaraan atau jalur.'),
 q('n4-v3','vocabulary','n4-context-daily-problems','Mesin rusak dan perlu diperbaiki. Kata untuk perbaikan?','修理',['用事','約束','都合'],'修理（しゅうり）berarti perbaikan.'),
 q('n4-v4','vocabulary','n4-context-daily-problems','Pilih bacaan 連絡.','れんらく',['れんろく','れんがく','ねんらく'],'連絡 dibaca れんらく.'),
 q('n4-g1','grammar','n4-volitional-form','Pilih bentuk volisional 食べる.','食べよう',['食べろう','食べこう','食べう'],'Golongan II: hapus る lalu tambah よう.'),
 q('n4-g2','grammar','n4-nagara','テレビを＿＿ながら食べます。','見',['見る','見て','見た'],'ながら mengikuti batang ます: 見.'),
 q('n4-g3','grammar','n4-experience','京都へ＿＿ことがあります。','行った',['行く','行って','行きます'],'Pengalaman memakai bentuk た + ことがある.'),
 q('n4-g4','grammar','n4-decision','自分で決めました。来月から運動することに＿＿。','しました',['なりました','ありました','いました'],'Keputusan sendiri menggunakan ことにする.'),
 q('n4-g5','grammar','n4-favors','友達が私に道を教えて＿＿。','くれました',['あげました','もらいました','いただきました'],'Teman melakukan bantuan untuk pembicara: てくれる.'),
 q('n4-g6','grammar','n4-embedded-question','行く＿＿、まだ決めていません。','かどうか',['ために','ように','ながら'],'Pertanyaan ya/tidak tertanam memakai かどうか.'),
 q('n4-g7','grammar','n4-explanation','学生＿＿です。 Pilih penjelasan latar.','なん',['だん','のん','くん'],'Nomina + な + んです.'),
 q('n4-g8','grammar','n4-without','傘を持た＿＿出かけました。 Tanpa membawa payung.','ないで',['なくては','ないなら','ないから'],'ないで menyatakan tindakan berikutnya dilakukan tanpa tindakan pertama.'),
 q('n4-r1','reading','n4-read-community','Apa yang perlu dibawa sendiri?','エプロン',['材料','椅子','鍋'],'材料 disediakan, tetapi エプロン perlu dibawa.',n4Read),
 q('n4-r2','reading','n4-read-community','Apa yang berubah?','会場の階',['開始時刻','参加する日','料理の材料'],'Tempat berubah dari lantai dua ke tiga; jam tetap.',n4Read),
 q('n4-r3','reading','n4-read-plan','Kapan penulis berniat mengembalikan buku?','水曜日の夕方',['金曜日の朝','木曜日の夕方','日曜日の朝'],'Rencana pribadi eksplisit adalah 水曜日の夕方.',n4Read2),
 q('n4-r4','reading','n4-read-plan','Mengapa bukan Kamis?','図書館が休みだから',['仕事があるから','本がないから','約束が変わったから'],'木曜日は図書館が休み menjelaskan alasan.',n4Read2),
 q('n4-l1','listening','n4-listen-favor','Berapa salinan yang diminta akhirnya?','十五枚',['十枚','五枚','二十枚'],'Jumlah dikoreksi menjadi 十五枚 karena peserta bertambah.',n4Listen),
 q('n4-l2','listening','n4-listen-favor','Siapa yang membagikan dokumen?','Ａ',['Ｂ','田中さん','まだ決まっていない'],'A mengatakan それは私がします.',n4Listen),
 q('n4-l3','listening','n4-listen-condition','Jika hujan, rencana akhirnya apa?','家で映画を見る',['山へ行く','美術館へ行く','駅で待つ'],'Usulan museum diganti karena museum tutup.',n4Listen2),
 q('n4-l4','listening','n4-listen-condition','Mengapa museum tidak dipilih?','今週休みだから',['遠いから','高いから','雨が降らないから'],'B menjelaskan 美術館は今週休み.',n4Listen2)
],
N3:[
 q('n3-v1','vocabulary','n3-context-work-context','Pilih bacaan 調整.','ちょうせい',['ちょうさい','しょうせい','ちょうてい'],'調整（ちょうせい）berarti penyesuaian.'),
 q('n3-v2','vocabulary','n3-context-work-context','Kata untuk urutan langkah pekerjaan?','手順',['返信','資料','相談'],'手順（てじゅん）adalah prosedur atau urutan langkah.'),
 q('n3-v3','vocabulary','n3-context-reasoning-context','Pilih bacaan 可能性.','かのうせい',['かのせい','かこうせい','かようせい'],'可能性（かのうせい）berarti kemungkinan.'),
 q('n3-v4','vocabulary','n3-context-reasoning-context','具体的な例 berarti …','Contoh yang konkret',['Contoh yang rahasia','Kesimpulan yang salah','Pendapat yang sama'],'具体的 menekankan sifat konkret atau spesifik.'),
 q('n3-g1','grammar','n3-wake','高い物が必ずいい＿＿。 Tidak selalu bagus.','わけではありません',['わけがありません','ことがありません','はずがありません'],'わけではない menyangkal generalisasi, bukan seluruh kemungkinan.'),
 q('n3-g2','grammar','n3-depending','人＿＿考え方が違います。','によって',['について','として','のために'],'によって menunjukkan variasi menurut orangnya.'),
 q('n3-g3','grammar','n3-totan','外に出た＿＿、雨が降り始めました。','とたん',['つもり','べき','ように'],'たとたん menghubungkan kejadian yang segera menyusul.'),
 q('n3-g4','grammar','n3-no-need','そんなに心配する＿＿。 Tidak perlu.','ことはありません',['ことがありません','べきです','わけです'],'ことはない berarti tidak perlu melakukan.'),
 q('n3-g5','grammar','n3-muki','子供向けの本 menekankan …','Buku dirancang untuk anak-anak',['Buku selalu ditulis anak-anak','Buku hanya tentang masa lalu','Buku milik satu anak'],'向け menandai sasaran yang dituju pembuat.'),
 q('n3-g6','grammar','n3-tsurete','経験が増える＿＿、自信もついてきました。','につれて',['としても','ために','ことなく'],'につれて menyatakan dua perubahan yang berjalan bersama.'),
 q('n3-g7','grammar','n3-respect','Pilih bentuk hormat untuk “direktur datang”.','社長がいらっしゃいます',['社長が参ります','社長が伺います','社長を拝見します'],'いらっしゃる menghormati datang/pergi/berada; 参る dan 伺う merendahkan diri.'),
 q('n3-g8','grammar','n3-even-if','急いだ＿＿、もう間に合いません。 Sekalipun bergegas.','としても',['ために','ところで','につれて'],'としても menyatakan hasil tetap berlaku meski asumsi diterima.'),
 q('n3-r1','reading','n3-read-library','Apa tenggat reservasi yang baru?','Tujuh hari sebelum penggunaan',['Tiga hari sebelum penggunaan','Tujuh hari setelah penggunaan','Pada hari penggunaan'],'七日前まで adalah aturan baru.',n3Read),
 q('n3-r2','reading','n3-read-library','Siapa yang tidak perlu mengulang prosedur?','Orang yang sudah melakukan reservasi',['Semua pelanggan baru','Hanya pegawai','Pengguna tanpa internet'],'ただし memperkenalkan pengecualian bagi 予約済みの方.',n3Read),
 q('n3-r3','reading','n3-read-choice','Sikap penulis terhadap alat baru?','Manfaatnya bergantung proses belajar dan jenis pekerjaan',['Selalu menolak alat baru','Selalu memilih yang termurah','Menganggap semua pekerjaan langsung lebih cepat'],'Penulis mempertimbangkan waktu belajar dan pekerjaan yang berulang.',n3Read2),
 q('n3-r4','reading','n3-read-choice','Selain harga, apa yang perlu dipertimbangkan?','作業の内容',['友達の年齢','商品の色','会社の住所'],'Kalimat akhir menyebut 作業の内容.',n3Read2),
 q('n3-l1','listening','n3-listen-source','Apa dasar keberatan B?','Hasil survei menunjukkan usia pengguna beragam',['Semua pengguna muda','Anggaran belum cukup','Lokasi terlalu jauh'],'B merujuk 調査 dan 年齢が幅広い.',n3Listen),
 q('n3-l2','listening','n3-listen-decision','Apa langkah pertama yang disepakati?','利用目的を調べる',['若い人だけを対象にする','企画を全部やめる','料金を上げる'],'B meminta meneliti tujuan penggunaan terlebih dahulu.',n3Listen),
 q('n3-l3','listening','n3-listen-process','Apa yang harus dikerjakan hari ini?','数字の確認',['全資料の完成','資料の提出','会議の中止'],'B membatasi pekerjaan hari ini pada pemeriksaan angka.',n3Listen2),
 q('n3-l4','listening','n3-listen-process','Kapan dokumen harus diserahkan?','明後日',['今日','明日','来週'],'提出は明後日 adalah tenggat; rapat besok hanya memerlukan angka.',n3Listen2)
]};
export type ExamAnswer={id:string;answer:string;usedTranscript?:boolean};
export function scoreExam(level:string,answers:ExamAnswer[]){
 const bank=examBanks[level];if(!bank)throw Error('Level tidak tersedia');
 const map=new Map(answers.map(a=>[a.id,a]));
 const details=bank.map(q=>({id:q.id,skill:q.skill,lessonId:q.lessonId,prompt:q.prompt,answer:map.get(q.id)?.answer||'',correct:grade(q,map.get(q.id)?.answer||''),accepted:q.answers[0],explanation:q.explanation,usedTranscript:q.skill==='listening'&&!!map.get(q.id)?.usedTranscript}));
 const skills=(Object.keys(examSkillNames) as ExamSkill[]).map(skill=>{const rows=details.filter(d=>d.skill===skill);return {skill,label:examSkillNames[skill],correct:rows.filter(d=>d.correct).length,total:rows.length,textAssisted:rows.filter(d=>d.usedTranscript).length}});
 const recommendations=[...new Set(details.filter(d=>!d.correct||d.usedTranscript).map(d=>d.lessonId))].map(id=>({id,title:lessons.find(l=>l.id===id)?.title||id}));
 return {version:examVersion,level,correct:details.filter(d=>d.correct).length,total:bank.length,skills,details,recommendations};
}
export type ExamResult=ReturnType<typeof scoreExam>;
export function publicExam(level:string){return examBanks[level]?.map(({answers,explanation,...q})=>q)}
