'use client';

import React, { useState } from 'react';
import { MessageSquare, PhoneCall, X, ShieldAlert, AlertOctagon } from 'lucide-react';

export const EmergencyFAB: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Expanded Quick Options Menu */}
      {showOptions && (
        <div className="bg-slate-900 border-2 border-red-600 text-white rounded-2xl p-4 shadow-2xl space-y-3 w-72 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-sm text-yellow-400">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>Bantuan Darurat SOS</span>
            </div>
            <button 
              onClick={() => setShowOptions(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <a
            href="https://wa.me/6281119565222?text=Halo%20BP2MI,%20saya%20Pekerja%20Migran%20Indonesia%20membutuhkan%20bantuan%20darurat/pengaduan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold p-3 rounded-xl shadow transition-transform active:scale-95 text-sm"
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="leading-tight">WhatsApp BP2MI</p>
              <p className="text-[10px] text-green-200 font-normal">Respon Cepat 24 Jam</p>
            </div>
          </a>

          <a
            href="tel:08001000"
            className="flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold p-3 rounded-xl shadow transition-transform active:scale-95 text-sm"
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="leading-tight">Telepon Hotline 08001000</p>
              <p className="text-[10px] text-red-200 font-normal">Bebas Pulsa (Indonesia)</p>
            </div>
          </a>

          <a
            href="/darurat"
            className="block text-center text-xs font-semibold text-yellow-400 hover:underline pt-1"
          >
            Lihat Nomor KBRI & KJRI Luar Negeri →
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="group relative flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black px-4 py-3.5 rounded-full shadow-2xl ring-4 ring-red-500/30 transition-all transform active:scale-95"
        aria-label="Panggil Bantuan Darurat"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-300"></span>
        </span>
        
        <AlertOctagon className="w-6 h-6 stroke-[2.5]" />
        
        <span className="text-sm font-extrabold tracking-wide hidden sm:inline">SOS DARURAT</span>
      </button>
    </div>
  );
};
