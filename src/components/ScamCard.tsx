import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Globe, Eye, ChevronRight } from 'lucide-react';
import { ScamItem } from '@/types/scam';

interface ScamCardProps {
  scam: ScamItem;
}

export const ScamCard: React.FC<ScamCardProps> = ({ scam }) => {
  // Normalisasi data dengan fallback default yang aman dari TypeScript
  const riskLevel = scam.risk_level || scam.riskLevel || 'Waspada';
  const targetCountry = scam.target_country || scam.targetCountry || 'Semua Negara';
  const category = scam.category_slug || scam.categorySlug || scam.category || 'Umum';
  const summary = scam.summary || scam.description || scam.chronology || '';

  // Validasi array redFlags
  const rawRedFlags = scam.red_flags || scam.redFlags;
  const redFlags = Array.isArray(rawRedFlags) ? rawRedFlags : [];
  const firstRedFlag = redFlags.length > 0 ? redFlags[0] : null;

  const isDangerous = riskLevel === 'Sangat Berbahaya';

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Header Badges */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          {/* Risk Level Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase shadow-sm ${
              isDangerous
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-amber-500 text-slate-950 font-extrabold'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 stroke-[3]" />
            {riskLevel}
          </span>

          {/* Target Country */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            {targetCountry}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
            {category}
          </div>

          <h3 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
            <Link href={`/modus/${scam.slug}`}>
              {scam.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {summary}
          </p>

          {/* Preview Ciri Utama */}
          {firstRedFlag && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
              <p className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-600" />
                Ciri Utama Penipuan:
              </p>
              <p className="text-xs text-amber-950 font-medium line-clamp-2">
                "{firstRedFlag}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="p-4 pt-0">
        <Link
          href={`/modus/${scam.slug}`}
          className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow transition-colors group-hover:bg-red-600"
        >
          <span>Pelajari Modus & Cara Cek</span>
          <ChevronRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ScamCard;