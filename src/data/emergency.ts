export interface EmergencyContact {
  id: string;
  name: string;
  category: 'Pemerintah Pusat' | 'Taiwan' | 'Hong Kong' | 'Malaysia' | 'Arab Saudi';
  country: string;
  phone: string;
  whatsapp?: string;
  address: string;
  services: string[];
  isHotline24h: boolean;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'bp2mi-center',
    name: 'BP2MI Crisis Center (Pusat Bantuan PMI)',
    category: 'Pemerintah Pusat',
    country: 'Indonesia (Nasional)',
    phone: '08001000',
    whatsapp: '+6281119565222',
    address: 'Jl. M.T. Haryono No.52, Pancoran, Jakarta Selatan',
    services: ['Layanan Pengaduan 24 Jam', 'Bantuan Pemulangan', 'Kasus TPPO / Perdagangan Orang', 'Konsultasi Legalitas P3MI'],
    isHotline24h: true
  },
  {
    id: 'tppo-polri',
    name: 'Satgas TPPO Bareskrim Polri',
    category: 'Pemerintah Pusat',
    country: 'Indonesia (Nasional)',
    phone: '110',
    whatsapp: '+6281284998000',
    address: 'Mabes Polri, Kebayoran Baru, Jakarta Selatan',
    services: ['Laporan Tindak Pidana Perdagangan Orang', 'Penyelidikan Calo Ilegal', 'Perlindungan Sanksi Pidana'],
    isHotline24h: true
  },
  {
    id: 'kdei-taipei',
    name: 'KDEI Taipei (Perwakilan RI di Taiwan)',
    category: 'Taiwan',
    country: 'Taiwan',
    phone: '+886287526868',
    whatsapp: '+886988981470',
    address: '6F, No. 550, Ruiguang Rd, Neihu District, Taipei City, Taiwan',
    services: ['Perlindungan Tenaga Kerja Taiwan', 'Pengaduan Agensi/Gaji', 'Ketenagakerjaan & Kekerasan', 'Dokumen Paspor & SPLP'],
    isHotline24h: true
  },
  {
    id: 'kjri-hongkong',
    name: 'KJRI Hong Kong',
    category: 'Hong Kong',
    country: 'Hong Kong',
    phone: '+85228634400',
    whatsapp: '+85267734004',
    address: '127-129 Leighton Road, Causeway Bay, Hong Kong',
    services: ['Bantuan Hukum PMI HK', 'Perlindungan Finansial & Overcharging', 'Shelter Darurat PMI', 'Bantuan Keimigrasian'],
    isHotline24h: true
  },
  {
    id: 'kbri-kualalumpur',
    name: 'KBRI Kuala Lumpur',
    category: 'Malaysia',
    country: 'Malaysia',
    phone: '+60321164011',
    whatsapp: '+60166792352',
    address: '233 Jalan Tun Razak, 50400 Kuala Lumpur, Malaysia',
    services: ['Pengaduan PMI Malaysia', 'Pendataan Rekalibrasi / Amnesty', 'Perlindungan Paspor & Gaji', 'Pendampingan Hukum'],
    isHotline24h: true
  },
  {
    id: 'kbri-riyadh',
    name: 'KBRI Riyadh (Arab Saudi)',
    category: 'Arab Saudi',
    country: 'Arab Saudi',
    phone: '+966114882800',
    whatsapp: '+966504439626',
    address: 'Diplomatic Quarter, P.O. Box 94343, Riyadh 11693, Saudi Arabia',
    services: ['Pendampingan Hukum Kaburan/Kekerasan', 'Pengaduan Gaji Macet', 'Penerbitan SPLP', 'Perlindungan Pekerja Domestik'],
    isHotline24h: true
  },
  {
    id: 'kjri-jeddah',
    name: 'KJRI Jeddah (Arab Saudi)',
    category: 'Arab Saudi',
    country: 'Arab Saudi',
    phone: '+966126711271',
    whatsapp: '+966503617676',
    address: 'Al-Mualifin St., Al-Rehab District, Jeddah, Saudi Arabia',
    services: ['Konsuler & Perlindungan PMI Wilayah Barat', 'Bantuan Pemulangan Umrah/Kerja', 'Shelter Tarhib'],
    isHotline24h: true
  }
];
