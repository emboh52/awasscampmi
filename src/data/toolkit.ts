export interface CheckTool {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  externalLink: string;
  iconName: 'PhoneCall' | 'Image' | 'CreditCard' | 'Building2';
  steps: string[];
  tagGuide: { tag: string; meaning: string; action: 'danger' | 'warning' | 'safe' }[];
}

export const CHECK_TOOLS: CheckTool[] = [
  {
    id: 'lacak-kontak',
    name: 'Lacak Kontak & Tag Penipu',
    category: 'Verifikasi Nomor Telepon',
    badge: 'Getcontact / Truecaller',
    description: 'Cari tahu bagaimana orang lain menamai nomor HP calo atau kenalan baru Anda di WhatsApp.',
    externalLink: 'https://www.getcontact.com',
    iconName: 'PhoneCall',
    steps: [
      'Salin nomor HP penipu yang menghubungi Anda.',
      'Buka aplikasi Getcontact atau Truecaller di smartphone Anda.',
      'Tempelkan nomor telepon pada kolom pencarian.',
      'Periksa daftar Tag/Penanda yang diberikan oleh pengguna lain.'
    ],
    tagGuide: [
      { tag: 'Penipu / Penipu Visa / Calo Fake', meaning: 'Sangat Berbahaya! Lebih dari 5 orang menandai nomor ini sebagai penipu.', action: 'danger' },
      { tag: 'PT Fiktif / Spam / Marketing', meaning: 'Waspada! Nomor sering dipakai spaming lowongan bodong.', action: 'warning' },
      { tag: 'Nama Orang Sesuai KTP / Nama P3MI Resmi', meaning: 'Relatif Aman, tetapi tetap verifikasi dokumen kerja resmi.', action: 'safe' }
    ]
  },
  {
    id: 'lacak-foto',
    name: 'Lacak Foto / Reverse Image Search',
    category: 'Verifikasi Wajah & Profil',
    badge: 'Google Lens / Yandex',
    description: 'Cek apakah foto pacar online atau foto tentara/pilot yang mendekati Anda adalah foto curian dari internet.',
    externalLink: 'https://lens.google.com',
    iconName: 'Image',
    steps: [
      'Simpan/Tangkap layar (screenshot) foto profil pasangan atau agen penawar kerja.',
      'Buka situs Google Lens (lens.google.com) atau Yandex Images.',
      'Upload foto tersebut ke dalam mesin pencari gambar.',
      'Lihat apakah foto yang sama muncul di akun media sosial orang lain (biasanya akun publik tentara/model luar negeri).'
    ],
    tagGuide: [
      { tag: 'Foto Muncul di Akun Instagram Model/Prajurit Asli', meaning: 'Penipuan Love Scam! Foto ini dicuri pelaku untuk mengelabui Anda.', action: 'danger' },
      { tag: 'Foto Muncul di Artikel Berita Kasus Penipuan', meaning: 'Waspada! Wajah penipu sudah pernah dilaporkan ke polisi.', action: 'danger' },
      { tag: 'Tidak Ditemukan Kembaran di Internet', meaning: 'Belum tentu asli, tetap jangan pernah berikan uang/pulsa.', action: 'warning' }
    ]
  },
  {
    id: 'lacak-rekening',
    name: 'Lacak Rekening Bank & E-Wallet',
    category: 'Verifikasi Transaksi Keuangan',
    badge: 'Cekrekening.id Kominfo',
    description: 'Periksa riwayat laporan kejahatan pada nomor rekening bank sebelum Anda menstransfer uang DP kerja atau pajak paket.',
    externalLink: 'https://cekrekening.id',
    iconName: 'CreditCard',
    steps: [
      'Minta nama bank dan nomor rekening tujuan transfer.',
      'Kunjungi situs resmi Kementerian Kominfo di Cekrekening.id.',
      'Pilih nama bank dan masukkan nomor rekening.',
      'Periksa apakah rekening tersebut pernah dilaporkan terkait kejahatan penipuan.'
    ],
    tagGuide: [
      { tag: 'Pernah Dilaporkan > 1 Kali', meaning: 'REKENING PENIPU! Jangan lakukan transfer sama sekali.', action: 'danger' },
      { tag: 'Rekening Atas Nama Perorangan (Bukan PT)', meaning: 'Waspada! Pembayaran kerja resmi Wajib ke rekening perusahaan P3MI.', action: 'warning' },
      { tag: 'Belum Ada Laporan', meaning: 'Tetap waspada jika diminta uang muka tanpa bukti resi resmi berkop surat.', action: 'safe' }
    ]
  },
  {
    id: 'lacak-agen',
    name: 'Lacak PT / P3MI Resmi BP2MI',
    category: 'Verifikasi Legalitas Penyalur Kerja',
    badge: 'SISKOP2MI BP2MI',
    description: 'Pastikan Perusahaan Penempatan Pekerja Migran Indonesia (P3MI) terdaftar aktif dan berizin resmi Kemnaker.',
    externalLink: 'https://siskop2mi.bp2mi.go.id',
    iconName: 'Building2',
    steps: [
      'Minta nama lengkap PT/P3MI yang menawari Anda pekerjaan.',
      'Buka Portal SISKOP2MI BP2MI.',
      'Cari nama PT pada kolom pencarian P3MI Terdaftar.',
      'Cek status izin: Aktif, Suspend (Dibekukan), atau Tidak Terdaftar (Calo/PT Ilegal).'
    ],
    tagGuide: [
      { tag: 'Status: DIBEKUKAN / IZIN DICABUT', meaning: 'Dilarang mendaftar! PT bermasalah hukum atau melanggar aturan.', action: 'danger' },
      { tag: 'Tidak Ditemukan Hasil', meaning: 'Calo/PT Bodong! Tidak berizin resmi menyalurkan tenaga kerja.', action: 'danger' },
      { tag: 'Status: AKTIF dengan SIP3MI Valid', meaning: 'P3MI Resmi terdaftar di pemerintah.', action: 'safe' }
    ]
  }
];
