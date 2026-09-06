'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, ShieldAlert, Plane, Heart, Wallet, Laptop, ArrowRight, CheckCircle2, Wrench, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { ScamCard } from '@/components/ScamCard';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function HomePage() {
  const [scams, setScams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'pra-keberangkatan', name: 'Pra-Keberangkatan', icon: Plane, color: 'bg-red-500 hover:bg-red-600 text-white', desc: 'Lowongan fake, visa turis, calo' },
    { id: 'love-scam', name: 'Love Scam / Asmara', icon: Heart, color: 'bg-pink-600 hover:bg-pink-700 text-white', desc: 'Tentara palsu, paket bea cukai' },
    { id: 'pinjol-keuangan', name: 'Pinjol & Keuangan', icon: Wallet, color: 'bg-amber-600 hover:bg-amber-700 text-white', desc: 'Gadai paspor, koperasi bodong' },
    { id: 'kerja-sampingan', name: 'Kerja Sampingan Online', icon: Laptop, color: 'bg-blue-600 hover:bg-blue-700 text-white', desc: 'Like YouTube, deposit komisi' },
  ];

  // Fetch data postingan dari Supabase
  useEffect(() => {
    async function fetchScams() {
      setLoading(true);
      const { data, error } = await supabase
        .from('scams') // Sesuaikan dengan nama tabel di Supabase Anda
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Gagal mengambil data dari Supabase:', error.message);
      } else if (data) {
        // Normalisasi data dari format database (snake_case) ke format komponen (camelCase)
        const normalizedData = data.map((scams) => ({
          ...scams,
          summary: scams.summary || scams.description || scams.content || '',
          categorySlug: scams.category_slug || scams.categorySlug || 'pra-keberangkatan',
          targetCountry: scams.target_country || scams.targetCountry || 'Semua Negara',
          riskLevel: scams.risk_level || scams.riskLevel || 'Waspada',
          redFlags: Array.isArray(scams.red_flags)
            ? scams.red_flags
            : Array.isArray(scams.redFlags)
            ? scams.redFlags
            : [],
        }));
        setScams(normalizedData);
      }
      setLoading(false);
    }

    fetchScams();
  }, []);

  // Filter pencarian real-time
  const filteredScams = useMemo(() => {
    return scams.filter((scams) => {
      const matchesSearch =
        searchQuery === '' ||
        (scams.title && scams.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (scams.summary && scams.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (scams.targetCountry && scams.targetCountry.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (scams.redFlags && scams.redFlags.some((rf: string) => rf.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory =
        selectedCategory === 'all' || scams.categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [scams, searchQuery, selectedCategory]);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-10 pb-16 px-4 relative overflow-hidden border-b-4 border-amber-500">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-600/30 text-yellow-300 border border-red-500/50 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wide">
            <ShieldAlert className="w-4 h-4 text-yellow-400" />
            <span>PROTEKSI PEKERJA MIGRAN INDONESIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Lindungi Keringat & Keselamatanmu dari <span className="text-yellow-400 underline decoration-red-600 decoration-wavy">Penipuan!</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Cari cepat modus penipuan terbaru, kenali ciri-cirinya, dan lakukan verifikasi mandiri sebelum terlanjur rugi jutaan rupiah.
          </p>

          {/* Instant Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center shadow-2xl">
              <Search className="w-6 h-6 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kata kunci penipuan (mis: Taiwan, Visa Turis)..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 pl-12 pr-20 py-4 rounded-2xl text-base sm:text-lg font-bold focus:outline-none focus:ring-4 focus:ring-yellow-400 border-2 border-yellow-400 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md font-bold transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Pencarian langsung (real-time). Hasil diperbarui secara otomatis di bawah.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Category Buttons Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span>Akses Cepat Kategori Penipuan</span>
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-red-600 bg-red-50 ring-2 ring-red-500'
                    : 'border-slate-200 bg-white hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${cat.color} shadow`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-red-600" />}
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                    {cat.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Modus Terpopuler Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 border-b-2 border-slate-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              <span>Modus Penipuan Terpopuler</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              {searchQuery || selectedCategory !== 'all'
                ? `Menampilkan ${filteredScams.length} hasil pencarian`
                : 'Cermati modus yang paling sering memakan korban PMI'}
            </p>
          </div>

          <Link
            href="/modus"
            className="hidden sm:flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 underline"
          >
            Lihat Semua Modus <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            <p className="text-slate-500 font-medium text-sm">Memuat data dari Supabase...</p>
          </div>
        ) : filteredScams.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-slate-300 space-y-3">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Modus Tidak Ditemukan</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Tidak ada modus penipuan yang sesuai dengan kata kunci "{searchQuery}". Coba kata kunci lain atau kirimkan laporan baru.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-xl"
              >
                Reset Pencarian
              </button>
              <Link
                href="/submit"
                className="bg-yellow-500 text-slate-950 text-sm font-bold px-4 py-2 rounded-xl"
              >
                Laporkan Modus Ini
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScams.map((scam) => (
              <ScamCard key={scam.id} scam={scam} />
            ))}
          </div>
        )}
      </section>

      {/* Banner Toolkit Call to Action */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-amber-400 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
              <Wrench className="w-3.5 h-3.5" />
              <span>TOOLKIT GRATIS & PRAKTIS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              Curiga Nomor HP, Foto Pacar, atau Rekening Calo?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Gunakan Alat Cek Mandiri untuk melacak tag kontak Getcontact, melacak foto profil via Google Lens, serta verifikasi rekening bank resmi di Cekrekening.id Kominfo.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/toolkit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-6 py-4 rounded-2xl text-base shadow-xl transition-transform active:scale-95"
            >
              <span>Buka Alat Cek Mandiri</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}