'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, ShieldAlert, Upload, CheckCircle2, AlertTriangle, ArrowLeft, Send, FileText } from 'lucide-react';

export default function SubmitScamPage() {
  const [reporterName, setReporterName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pra-Keberangkatan');
  const [targetCountry, setTargetCountry] = useState('Taiwan');
  const [chronology, setChronology] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !chronology) {
      alert('Mohon isi judul penipuan dan kronologi singkat!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-red-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        Kembali ke Beranda
      </Link>

      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-b-4 border-yellow-400 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
          <PlusCircle className="w-4 h-4" />
          <span>LAPORAN MODUS PENIPUAN BARU</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          Bantu Sesama Pekerja Migran Terhindar dari Penipuan
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-medium">
          Menemukan tawaran mencurigakan di media sosial atau menjadi korban calo bodong? Laporkan secara anonim agar tim verifikasi kami menayangkannya di katalog.
        </p>
      </div>

      {submitted ? (
        /* Success State Box */
        <div className="bg-white rounded-3xl p-8 border-4 border-green-500 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-green-100 text-green-700 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            Laporan Berhasil Terkirim!
          </h2>

          <p className="text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
            Terima kasih banyak atas kepedulian Anda. Laporan modus penipuan ini akan diverifikasi oleh pengurus perlindungan PMI sebelum ditayangkan di Katalog Utama.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setChronology('');
                setUploadedFileName(null);
              }}
              className="bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow"
            >
              Kirim Laporan Lainnya
            </button>
            <Link
              href="/modus"
              className="bg-yellow-500 text-slate-950 font-black text-sm px-6 py-3 rounded-xl shadow"
            >
              Lihat Katalog Modus
            </Link>
          </div>
        </div>
      ) : (
        /* Form Section */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-6">
          {/* Identity Option */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 text-red-600 border-amber-400 rounded focus:ring-red-500"
              />
              <span className="text-sm font-bold text-amber-950">
                Kirim secara Anonim (Identitas Rahasia)
              </span>
            </label>
            {!isAnonymous && (
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Nama Pengirim (Opsional)"
                className="w-full bg-white text-slate-900 border border-amber-300 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-extrabold text-slate-800 mb-1">
              Judul Modus / Nama Penipuan <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Lowongan Pabrik Taiwan Bebas Seleksi via WhatsApp"
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Category & Target Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Modus:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="Pra-Keberangkatan">Pra-Keberangkatan</option>
                <option value="Love Scam / Asmara">Love Scam / Asmara</option>
                <option value="Pinjol & Keuangan">Pinjol & Keuangan</option>
                <option value="Kerja Sampingan Online">Kerja Sampingan Online</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Negara:</label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="Taiwan">Taiwan</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Arab Saudi">Arab Saudi</option>
                <option value="Semua Negara (Global)">Semua Negara (Global)</option>
              </select>
            </div>
          </div>

          {/* Chronology */}
          <div>
            <label className="block text-sm font-extrabold text-slate-800 mb-1">
              Kronologi Singkat / Cara Kerja Penipu <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={chronology}
              onChange={(e) => setChronology(e.target.value)}
              placeholder="Ceritakan bagaimana penipu menghubungi Anda, berapa uang yang diminta, atau janji-janji manis yang diberikan..."
              className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600"
            ></textarea>
          </div>

          {/* Upload Bukti / Screenshot */}
          <div>
            <label className="block text-sm font-extrabold text-slate-800 mb-1">
              Upload Bukti / Tangkapan Layar Chat (Opsional):
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">
                {uploadedFileName ? (
                  <span className="text-green-600 flex items-center justify-center gap-1">
                    <FileText className="w-4 h-4" /> {uploadedFileName}
                  </span>
                ) : (
                  'Klik atau seret file screenshot chat/brosur ke sini (PNG/JPG)'
                )}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95"
          >
            <Send className="w-5 h-5" />
            <span>Kirim Laporan Modus</span>
          </button>
        </form>
      )}
    </div>
  );
}
