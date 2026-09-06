'use client';

import React, { useState } from 'react';
import { MessageCircle, Facebook, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  targetCountry: string;
}

export default function ShareButtons({ title, targetCountry }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Perhatian dulur-dulur PMI! Kenali modus penipuan "${title}" (Target: ${targetCountry}). Cek ciri-ciri & langkah pencegahannya di sini:`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${window.location.href}`)}`;
      window.open(url, '_blank');
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== 'undefined') {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 pt-2">
      <button
        onClick={handleShareWhatsApp}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow transition-transform active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span>Bagikan via WhatsApp</span>
      </button>

      <button
        onClick={handleShareFacebook}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow transition-transform active:scale-95"
      >
        <Facebook className="w-5 h-5 fill-current" />
        <span>Bagikan di Facebook</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow transition-transform active:scale-95"
      >
        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
        <span>{copied ? 'Link Tersalin!' : 'Salin Link'}</span>
      </button>
    </div>
  );
}