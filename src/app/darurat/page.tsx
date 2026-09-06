'use client';

import React, { useState, useMemo } from 'react';
import { EMERGENCY_CONTACTS } from '@/data/emergency';
import { PhoneCall, MessageSquare, MapPin, ShieldAlert, Globe, Clock, CheckCircle2 } from 'lucide-react';

export default function EmergencyPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('Semua');

  const countryCategories = ['Semua', 'Pemerintah Pusat', 'Taiwan', 'Hong Kong', 'Malaysia', 'Arab Saudi'];

  const filteredContacts = useMemo(() => {
    if (selectedCountry === 'Semua') return EMERGENCY_CONTACTS;
    if (selectedCountry === 'Pemerintah Pusat') return EMERGENCY_CONTACTS.filter(c => c.category === 'Pemerintah Pusat');
    return EMERGENCY_CONTACTS.filter(c => c.country === selectedCountry || c.category === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-red-700 text-white rounded-3xl p-6 sm:p-8 border-b-4 border-yellow-400 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
          <ShieldAlert className="w-4 h-4" />
          <span>HOTLINE RESMI KONSULER & BP2MI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          Direktori Kontak Darurat PMI
        </h1>
        <p className="text-sm sm:text-base text-red-100 max-w-2xl font-medium">
          Daftar kontak perwakilan resmi Republik Indonesia (KBRI/KJRI), Crisis Center BP2MI, dan Satgas TPPO Polri untuk bantuan langsung.
        </p>
      </div>

      {/* Country Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {countryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCountry(cat)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm ${
              selectedCountry === cat
                ? 'bg-slate-900 text-yellow-400 ring-2 ring-slate-900'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="bg-red-100 text-red-800 text-xs font-black px-3 py-1 rounded-full border border-red-200">
                  {contact.category}
                </span>

                {contact.isHotline24h && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-black px-2.5 py-1 rounded-full border border-green-200">
                    <Clock className="w-3.5 h-3.5" /> 24 Jam
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 leading-snug">
                {contact.name}
              </h2>

              <p className="text-xs text-slate-500 font-medium flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </p>

              {/* Provided Services */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-1.5">
                <p className="text-[11px] font-black text-slate-700 uppercase">Layanan Bantuan:</p>
                <div className="flex flex-wrap gap-1.5">
                  {contact.services.map((srv, idx) => (
                    <span key={idx} className="bg-white text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                className="bg-red-600 hover:bg-red-500 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4 stroke-[2.5]" />
                <span>Panggil Telefon</span>
              </a>

              {contact.whatsapp ? (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(contact.name)},%20saya%20Pekerja%20Migran%20Indonesia%20membutuhkan%20informasi/bantuan`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 stroke-[2.5]" />
                  <span>WhatsApp Chat</span>
                </a>
              ) : (
                <div className="bg-slate-100 text-slate-400 font-bold py-3 px-4 rounded-xl text-xs text-center border border-slate-200">
                  Layanan Telefon Utama
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
