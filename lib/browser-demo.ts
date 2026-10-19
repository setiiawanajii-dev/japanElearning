import type {Scenario} from './types';
export function demoReply(s:Scenario,b:{message:string}){
 const ja=/[ぁ-んァ-ン一-龯]/.test(b.message);let matched=false,reply=s.opening,feedback='Coba tulis respons dalam bahasa Jepang. Gunakan petunjuk bila perlu.';
 if(ja){if(s.id==='intro'){matched=/です|と申します|といいます/.test(b.message);reply=matched?'よろしくお願いします。どこから来ましたか。':'お名前は何ですか。';feedback=matched?'Pola perkenalan sopan terdeteksi. Untuk menyebut asal, gunakan インドネシアから来ました。':'Coba gunakan nama + です。 Contoh: リナです。';}
 if(s.id==='cafe'){matched=/ください|お願いします/.test(b.message);reply=matched?'はい。店内でお召し上がりですか。':'何を飲みますか。';feedback=matched?'Permintaan sopan terdeteksi. 店内で berarti diminum di tempat.':'Tambahkan ください atau お願いします agar pesanan lebih sopan.';}
 if(s.id==='help'){matched=/もう一度|もういちど|ゆっくり/.test(b.message);reply=matched?'三番線です。三番線から出ます。':'わかりましたか。';feedback=matched?'Permintaan pengulangan terdeteksi. Konfirmasi dengan 三番線ですね。':'Untuk meminta pengulangan: もう一度言ってください。';}
 if(s.id==='opinion'){matched=/と思|とおも/.test(b.message);reply=matched?'そうですか。どうしてそう思いますか。':'この町は便利ですか。';feedback=matched?'Pola pendapat terdeteksi. Tambahkan alasan dengan から atau ので。':'Coba 便利だと思います。 Adjektiva-na membutuhkan だ sebelum と。';}}
 if(s.patterns){matched=ja&&s.patterns.some(pattern=>b.message.includes(pattern));reply=matched?(s.followup||s.opening):s.opening;feedback=matched?'Salah satu pola sasaran terdeteksi. '+s.feedback:'Belum menemukan pola sasaran. Coba contoh: '+s.hint;}
 feedback+=' Demo berbasis aturan: ini bukan penilaian bebas atas ketepatan, pemahaman, atau kelancaran.';
return {reply,feedback,matched,mode:'demo'};
}
