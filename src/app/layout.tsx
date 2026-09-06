import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyFAB } from '@/components/EmergencyFAB';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'AwasScamPMI - Pusat Edukasi Anti-Scam Pekerja Migran Indonesia',
  description: 'Basis pengetahuan independen tercepat dan mudah digunakan untuk Pekerja Migran Indonesia (PMI) terhindar dari lowongan palsu, love scam, pinjol ilegal, dan calo bodong.',
  // Tambahkan baris di bawah ini:
  verification: {
    google: 'Qkj5ohpKBF7tVOHrsFUL1osaOIuYuwg4jYTDfDLyvR0', // Masukkan nilai dari atribut content saja
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-100 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <EmergencyFAB />
        <Footer />
      </body>
    </html>
  );
}
