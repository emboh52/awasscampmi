import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  ShieldAlert, AlertTriangle, Globe, ArrowLeft, Share2, 
  CheckSquare, PhoneCall, ExternalLink, Eye
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ShareButtons from '@/components/ShareButtons';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. DYNAMIC METADATA UNTUK SEO GOOGLE & SOSMED
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: scam } = await supabase
    .from('scams')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!scam) {
    return {
      title: 'Modus Tidak Ditemukan | Waspada Penipuan PMI',
    };
  }

  const title = `${scam.title} | Waspada Modus Penipuan PMI`;
  const description = scam.summary || scam.chronology?.slice(0, 160) || 'Pelajari ciri-ciri dan cara menghindari modus penipuan ini.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: scam.created_at,
      modifiedTime: scam.updated_at || scam.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ScamDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch data langsung dari Supabase
  const { data: rawScam, error } = await supabase
    .from('scams')
    .select('*')
    .eq('slug', slug)
    .single();

  // Jika data tidak ada, picu halaman 404 resmi Next.js
  if (error || !rawScam) {
    notFound();
  }

  // 2. NORMALISASI DATA (Mencegah bug undefined dari kolom Supabase)
  const scam = {
    ...rawScam,
    riskLevel: rawScam.risk_level || rawScam.riskLevel || 'Waspada',
    category: rawScam.category || rawScam.category_slug || 'Umum',
    targetCountry: rawScam.target_country || rawScam.targetCountry || 'Semua Negara',
    chronology: rawScam.chronology || rawScam.description || rawScam.summary || '',
    updatedAt: rawScam.updated_at || rawScam.updatedAt || rawScam.created_at,
    redFlags: Array.isArray(rawScam.red_flags) 
      ? rawScam.red_flags 
      : Array.isArray(rawScam.redFlags) 
      ? rawScam.redFlags 
      : [],
    checkSteps: Array.isArray(rawScam.check_steps) 
      ? rawScam.check_steps 
      : Array.isArray(rawScam.checkSteps) 
      ? rawScam.checkSteps 
      : [],
    officialContacts: Array.isArray(rawScam.official_contacts) 
      ? rawScam.official_contacts 
      : Array.isArray(rawScam.officialContacts) 
      ? rawScam.officialContacts 
      : [],
  };

  const isDangerous = scam.riskLevel === 'Sangat Berbahaya';

  // 3. STRUCTURED DATA (JSON-LD) UNTUK GOOGLE RICH SNIPPETS
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: scam.title,
    description: scam.summary || scam.chronology.slice(0, 160),
    datePublished: rawScam.created_at,
    dateModified: scam.updatedAt,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <Link
        href="/modus"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-red-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        Kembali ke Katalog Modus
      </Link>

      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-b-4 border-red-600 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase shadow ${
              isDangerous ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-500 text-slate-950'
            }`}
          >
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
            {scam.riskLevel}
          </span>

          <span className="bg-slate-800 text-yellow-400 font-bold px-3 py-1 rounded-full text-xs border border-slate-700">
            {scam.category}
          </span>

          <span className="bg-slate-800 text-slate-200 font-bold px-3 py-1 rounded-full text-xs border border-slate-700 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Target: {scam.targetCountry}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black leading-tight">
          {scam.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
          <span>Diperbarui: {new Date(scam.updatedAt).toLocaleDateString('id-ID')}</span>
          <span>Dibaca ~{scam.views || 0}x</span>
        </div>
      </div>

      {/* SECTION 1: KRONOLOGI */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
          <ShieldAlert className="w-6 h-6 text-red-600" />
          <span>1. Kronologi & Cara Kerja Penipu</span>
        </h2>
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-800 font-medium whitespace-pre-line">
          {scam.chronology}
        </div>
      </section>

      {/* SECTION 2: RED FLAGS */}
      {scam.redFlags && scam.redFlags.length > 0 && (
        <section className="bg-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2.5 rounded-xl text-slate-950 shadow">
              <Eye className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950">
                2. Kotak Waspada (Red Flags)
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 font-semibold">
                Jika Anda menemukan salah satu poin ini, 100% dipastikan PENIPUAN!
              </p>
            </div>
          </div>

          <ul className="space-y-3 pt-2">
            {scam.redFlags.map((flag: string, idx: number) => (
              <li
                key={idx}
                className="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-sm flex items-start gap-3"
              >
                <div className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md mt-0.5 shrink-0">
                  BAHAYA #{idx + 1}
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {flag}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SECTION 3: LANGKAH ANTISIPASI */}
      {scam.checkSteps && scam.checkSteps.length > 0 && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <CheckSquare className="w-6 h-6 text-green-600" />
            <span>3. Langkah Antisipasi & Verifikasi Mandiri</span>
          </h2>

          <div className="space-y-4">
            {scam.checkSteps.map((step: any, idx: number) => (
              <div
                key={step.step || idx}
                className="bg-slate-50 rounded-2xl p-5 border-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="bg-slate-900 text-yellow-400 font-black text-sm w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    {step.step || idx + 1}
                  </span>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {step.actionUrl && (
                  <a
                    href={step.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-slate-900 hover:bg-red-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors shrink-0"
                  >
                    <span>{step.actionText || 'Buka Link'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: CONTACTS */}
      {scam.officialContacts && scam.officialContacts.length > 0 && (
        <section className="bg-red-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-red-600 shadow-xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-yellow-400 flex items-center gap-2 border-b border-red-800 pb-3">
            <PhoneCall className="w-6 h-6 text-red-500" />
            <span>4. Sudah Menjadi Korban / Terlanjur Transfer?</span>
          </h2>
          <p className="text-sm text-slate-200 font-medium">
            Segera hubungi saluran pengaduan resmi pemerintah untuk pemblokiran rekening penipu dan perlindungan hukum.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {scam.officialContacts.map((contact: any, idx: number) => (
              <div
                key={idx}
                className="bg-slate-900/90 rounded-2xl p-4 border border-red-700 flex flex-col justify-between space-y-2"
              >
                <div>
                  <p className="text-xs font-bold text-yellow-400">{contact.name}</p>
                  <p className="text-lg font-black text-white">{contact.phone}</p>
                  <p className="text-xs text-slate-400">{contact.note}</p>
                </div>

                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-black py-2 rounded-xl text-center shadow"
                >
                  Panggil Sekarang
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: SHARE BUTTONS */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-4 text-center">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5 text-slate-700" />
          <span>5. Bagikan Edukasi Ini ke Rekan Pekerja Migran</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Satu bagikan dari Anda bisa menyelamatkan tabungan dan keselamatan teman/keluarga PMI dari jeratan penipu.
        </p>

        <ShareButtons title={scam.title} targetCountry={scam.targetCountry} />
      </section>
    </div>
  );
}