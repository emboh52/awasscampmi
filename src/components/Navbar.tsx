'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldAlert, Menu, X, PhoneCall, AlertTriangle, Search, PlusCircle, Wrench } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Katalog Modus', href: '/modus' },
    { name: 'Alat Cek Mandiri', href: '/toolkit' },
    { name: 'Kontak Darurat', href: '/darurat' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-lg border-b-2 border-red-600">
      {/* Top Warning Marquee Notice */}
      <div className="bg-red-700 text-white px-3 py-1 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap animate-pulse">
          <AlertTriangle className="w-4 h-4 text-yellow-300 shrink-0" />
          <span>WASPADA SCAM: Jangan pernah transfer DP uang kerja ke rekening perorangan atau beri jaminan Paspor!</span>
        </div>
        <Link 
          href="/darurat" 
          className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ml-2 shadow"
        >
          SOS DARURAT
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 group-hover:bg-red-500 p-2 rounded-lg text-white transition-colors shadow">
            <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              AwasScam<span className="text-yellow-400">PMI</span>
            </span>
            <p className="text-[10px] text-slate-400 leading-none font-medium">Anti-Scam Knowledge Base PMI</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md font-semibold text-sm transition-all ${
                isActive(link.href)
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link
            href="/submit"
            className="ml-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-md text-sm flex items-center gap-1.5 shadow transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            Lapor Modus
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Buka Menu"
        >
          {isOpen ? <X className="w-7 h-7 text-yellow-400" /> : <Menu className="w-7 h-7 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-bold text-base transition-colors ${
                isActive(link.href)
                  ? 'bg-red-600 text-white'
                  : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/submit"
              onClick={() => setIsOpen(false)}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black px-4 py-3 rounded-lg text-base flex items-center justify-center gap-2 shadow"
            >
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
              Lapor Modus Penipuan Baru
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
