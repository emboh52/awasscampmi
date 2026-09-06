'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShieldAlert, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Memakai singleton instance
import { ScamCard } from '@/components/ScamCard';

export default function ModusCatalogPage() {
  const [scams, setScams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const countries = ['all', 'Taiwan', 'Hong Kong', 'Malaysia', 'Arab Saudi', 'Semua Negara'];
  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'pra-keberangkatan', label: 'Pra-Keberangkatan' },
    { id: 'love-scam', label: 'Love Scam / Asmara' },
    { id: 'pinjol-keuangan', label: 'Pinjol & Keuangan' },
    { id: 'kerja-sampingan', label: 'Kerja Sampingan Online' },
  ];

  useEffect(() => {
    async function fetchScams() {
      setLoading(true);
      const { data, error } = await supabase
        .from('scams') // Query langsung ke tabel scams
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Gagal mengambil data modus:', error.message);
      } else if (data) {
        const normalizedData = data.map((scam) => ({
          ...scam,
          summary: scam.summary || scam.description || scam.chronology || '',
          categorySlug: scam.category_slug || scam.category || 'pra-keberangkatan',
          targetCountry: scam.target_country || scam.targetCountry || 'Semua Negara',
          riskLevel: scam.risk_level || scam.riskLevel || 'Waspada',
          redFlags: Array.isArray(scam.red_flags)
            ? scam.red_flags
            : Array.isArray(scam.redFlags)
            ? scam.redFlags
            : [],
        }));
        setScams(normalizedData);
      }
      setLoading(false);
    }

    fetchScams();
  }, []);

  const filteredScams = useMemo(() => {
    return scams.filter((scam) => {
      const matchesSearch =
        searchQuery === '' ||
        (scam.title && scam.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (scam.summary && scam.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (scam.redFlags && scam.redFlags.some((rf: string) => rf.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory =
        selectedCategory === 'all' || scam.categorySlug === selectedCategory;

      const matchesCountry =
        selectedCountry === 'all' ||
        (scam.targetCountry && scam.targetCountry.toLowerCase().includes(selectedCountry.toLowerCase()));

      const matchesRisk =
        selectedRisk === 'all' || scam.riskLevel === selectedRisk;

      return matchesSearch && matchesCategory && matchesCountry && matchesRisk;
    });
  }, [scams, searchQuery, selectedCategory, selectedCountry, selectedRisk]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Title */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-b-4 border-red-600 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-black">
          <ShieldAlert className="w-4 h-4" />
          <span>KATALOG MODUS PENIPUAN PMI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          Daftar Lengkap Modus & Ciri Penipuan
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium">
          Pelajari seluruh seluk-beluk perangkap penipu yang menargetkan calon PMI dan purna pekerja migran di luar negeri.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan judul, kata kunci, atau deskripsi..."
            className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 font-medium text-sm sm:text-base"
          />
        </div>

        {/* Filters Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Kategori:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Country Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Negara:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">Semua Negara Target</option>
              {countries.filter(c => c !== 'all').map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Level Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Risiko:</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">Semua Tingkat Risiko</option>
              <option value="Sangat Berbahaya">Sangat Berbahaya</option>
              <option value="Waspada">Waspada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-700">
          Menampilkan <span className="text-red-600 font-black">{filteredScams.length}</span> modus penipuan
        </p>
        {(searchQuery || selectedCategory !== 'all' || selectedCountry !== 'all' || selectedRisk !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedCountry('all');
              setSelectedRisk('all');
            }}
            className="text-xs font-bold text-red-600 hover:underline"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Loading & Card Render */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Memuat data dari Supabase...</p>
        </div>
      ) : filteredScams.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-slate-300 space-y-3">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">Tidak ada modus yang cocok</h3>
          <p className="text-sm text-slate-600">
            Coba ubah kata kunci atau kombinasi filter Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => (
            <ScamCard key={scam.id} scam={scam} />
          ))}
        </div>
      )}
    </div>
  );
}