import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Kotoba — Selangkah lebih dekat dengan Jepang',description:'Belajar bahasa Jepang dalam bahasa Indonesia. Jalur JLPT dan kaiwa, dengan pengulangan yang mengikuti perkembanganmu.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
