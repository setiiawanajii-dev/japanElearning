import {applyAction,emptyState,stateSchema,saveExam,type BrowserState} from './browser-core';
import {examVersion,publicExam,scoreExam,type ExamAnswer} from './assessment';
export const storageKey='kotoba-browser-progress-v1';
export function readState():BrowserState{
 let raw:string|null;try{raw=localStorage.getItem(storageKey)}catch{throw Error('Penyimpanan browser diblokir. Izinkan penyimpanan situs untuk menyimpan progres.')}
 if(!raw)return emptyState();try{return stateSchema.parse(JSON.parse(raw))}catch{throw Error('Data browser tidak dapat dibaca. Impor cadangan melalui Profil & pengaturan; data lama belum dihapus.')}
}
export function writeState(state:BrowserState){try{localStorage.setItem(storageKey,JSON.stringify(state));window.dispatchEvent(new Event('kotoba-progress'))}catch{throw Error('Progres belum tersimpan. Penyimpanan browser penuh atau diblokir. Cadangkan progres dan kosongkan ruang.')}
}
async function exclusive<T>(action:()=>T):Promise<T>{if(navigator.locks)return navigator.locks.request(storageKey,action);return action()}
export async function mutateLocal(body:unknown){return exclusive(()=>{const {state,result}=applyAction(readState(),body);writeState(state);return result as any})}
export function getExam(level:string){const s=readState();return {version:examVersion,questions:publicExam(level),history:s.exams.filter(e=>e.level===level).map(e=>({id:e.id,createdAt:e.createdAt,result:scoreExam(e.level,e.answers)}))}}
export async function submitExam(id:string,level:string,answers:ExamAnswer[]){return exclusive(()=>{const out=saveExam(readState(),id,level,answers);writeState(out.state);return out.result})}
export async function importState(state:BrowserState){return exclusive(()=>writeState(stateSchema.parse(state)))}
