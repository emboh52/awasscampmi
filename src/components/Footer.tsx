import React from 'react';
import Link from 'next/link';
import { ShieldAlert, HeartHandshake, PhoneCall, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-red-600 pt-10 pb-20 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg text-white">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              AwasScam<span className="text-yellow-400">PMI</span>
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed pr-4">
            Platform edukasi & basis pengetahuan bebas penipuan independen untuk Pekerja Migran Indonesia (PMI/TKW).
            Didesain khusus ringan, cepat, dan mudah diakses di ponsel mana pun.
          </p>
          <div className="flex items-center gap-2 text-xs text-yellow-400 font-semibold bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>Hak Cipta & Keselamatan Pekerja Migran Tercinta</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base mb-3 border-b border-slate-800 pb-1">Navigasi Cepat</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/modus" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                • Katalog Modus Penipuan
              </Link>
            </li>
            <li>
              <Link href="/toolkit" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                • Alat Cek Mandiri Foto & Kontak
              </Link>
            </li>
            <li>
              <Link href="/darurat" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                • Kontak Resmi BP2MI & KBRI
              </Link>
            </li>
            <li>
              <Link href="/submit" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                • Laporkan Modus Baru
              </Link>
            </li>
          </ul>
        </div>

        {/* Bantuan Darurat */}
        <div>
          <h3 className="text-white font-bold text-base mb-3 border-b border-slate-800 pb-1">Kontak Resmi BP2MI</h3>
          <div className="space-y-2 text-xs">
            <p className="text-slate-300">
              <strong className="text-white">Call Center Bebas Pulsa:</strong><br />
              <a href="tel:08001000" className="text-yellow-400 text-sm font-black hover:underline">0800 1000</a> (Dalam Negeri)
            </p>
            <p className="text-slate-300">
              <strong className="text-white">Telepon Luar Negeri:</strong><br />
              <a href="tel:+622129247300" className="text-yellow-400 text-sm font-black hover:underline">+62 21 2924 7300</a>
            </p>
            <p className="text-slate-300">
              <strong className="text-white">WhatsApp Bantuan:</strong><br />
              <a href="https://wa.me/6281119565222" target="_blank" rel="noopener noreferrer" className="text-green-400 text-sm font-black hover:underline">+62 811-1956-5222</a>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-slate-900 text-center text-xs text-slate-500">
        © 2026 GuardPMI / AwasScamPMI. Informasi bersifat edukasi bebas biaya untuk perlindungan seluruh Pekerja Migran Indonesia.
      </div>
    </footer>
  );
};
