'use client';

import React, { useState } from 'react';
import { CHECK_TOOLS } from '@/data/toolkit';
import { PhoneCall, Image, CreditCard, Building2, ExternalLink, ShieldCheck, CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

export default function ToolkitPage() {
  const [activeToolId, setActiveToolId] = useState<string>(CHECK_TOOLS[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall': return PhoneCall;
      case 'Image': return Image;
      case 'CreditCard': return CreditCard;
      case 'Building2': return Building2;
      default: return ShieldCheck;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-b-4 border-yellow-400 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black">
          <ShieldCheck className="w-4 h-4" />
          <span>VERIFIKASI & PELAKAKAN MANDIRI</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">
          Alat Cek Mandiri Pencegah Penipuan
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium">
          Gunakan panduan dan alat verifikasi publik ini sebelum Anda menyetorkan uang muka, memberikan dokumen pribadi, atau mempercayai seseorang secara online.
        </p>
      </div>

      {/* Grid Kartu Panduan Interaktif */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHECK_TOOLS.map((tool) => {
          const IconComp = getIcon(tool.iconName);

          return (
            <div
              key={tool.id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Tool Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 text-yellow-400 p-3 rounded-2xl shadow">
                      <IconComp className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-red-600 uppercase tracking-wider">
                        {tool.category}
                      </span>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">
                        {tool.name}
                      </h2>
                    </div>
                  </div>

                  <span className="bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-1 rounded-lg border border-amber-300 shrink-0">
                    {tool.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {tool.description}
                </p>

                {/* Step-by-Step Guide */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                    Cara Penggunaan:
                  </h3>
                  <ol className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                    {tool.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="bg-slate-800 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tag Guide / Read Status Guide */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                    Panduan Membaca Hasil:
                  </h3>
                  <div className="space-y-1.5">
                    {tool.tagGuide.map((tg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-start gap-2 ${
                          tg.action === 'danger'
                            ? 'bg-red-50 text-red-950 border border-red-200'
                            : tg.action === 'warning'
                            ? 'bg-amber-50 text-amber-950 border border-amber-200'
                            : 'bg-green-50 text-green-950 border border-green-200'
                        }`}
                      >
                        {tg.action === 'danger' ? (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        ) : tg.action === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <strong className="block">{tg.tag}</strong>
                          <span className="font-normal opacity-90">{tg.meaning}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* External Link Action Button */}
              <a
                href={tool.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-red-600 text-white font-black py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span>Buka {tool.badge} Sekarang</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
