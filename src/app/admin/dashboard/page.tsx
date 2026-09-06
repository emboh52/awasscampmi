'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  FileText,
  Inbox,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  LogOut,
  PhoneCall,
  ShieldAlert,
  Loader2,
  X,
  RefreshCw,
  Eye,
  Pencil
} from 'lucide-react';

interface Scam {
  id: string;
  slug: string;
  title: string;
  category: string;
  target_country?: string;
  risk: string;
  summary?: string;
  chronology?: string;
  views: number;
  created_at?: string;
}

interface Submission {
  id: string;
  title: string;
  reporter: string;
  description?: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'modus' | 'reports' | 'settings'>('modus');

  const [scams, setScams] = useState<Scam[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [hotlineWA, setHotlineWA] = useState('');

  const [authChecking, setAuthChecking] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScam, setEditingScam] = useState<Scam | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Pra-Keberangkatan',
    target_country: 'Taiwan',
    risk: 'Sangat Berbahaya',
    summary: '',
    chronology: ''
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setAuthChecking(false);
        fetchAllData();
      }
    };
    checkSession();
  }, [router]);

  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([fetchScams(), fetchSubmissions(), fetchSettings()]);
    setIsLoading(false);
  };

  const fetchScams = async () => {
    const { data, error } = await supabase
      .from('scams')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setScams(data);
    }
  };

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('status', 'Pending')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    }
  };

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'hotline_wa')
      .maybeSingle();

    if (!error && data) {
      setHotlineWA(data.value);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleOpenAddModal = () => {
    setEditingScam(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Pra-Keberangkatan',
      target_country: 'Taiwan',
      risk: 'Sangat Berbahaya',
      summary: '',
      chronology: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (scam: Scam) => {
    setEditingScam(scam);
    setFormData({
      title: scam.title || '',
      slug: scam.slug || '',
      category: scam.category || 'Pra-Keberangkatan',
      target_country: scam.target_country || 'Taiwan',
      risk: scam.risk || 'Sangat Berbahaya',
      summary: scam.summary || '',
      chronology: scam.chronology || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveScam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const slugToUse = formData.slug.trim() || generateSlug(formData.title);

    const payload = {
      title: formData.title,
      slug: slugToUse,
      category: formData.category,
      category_slug: generateSlug(formData.category),
      target_country: formData.target_country,
      risk: formData.risk,
      summary: formData.summary,
      chronology: formData.chronology,
      updated_at: new Date().toISOString()
    };

    if (editingScam) {
      const { error } = await supabase
        .from('scams')
        .update(payload)
        .eq('id', editingScam.id);

      setIsSaving(false);

      if (error) {
        alert('Gagal mengedit modus: ' + error.message);
      } else {
        alert('Modus berhasil diperbarui!');
        setIsModalOpen(false);
        fetchScams();
      }
    } else {
      const { data, error } = await supabase
        .from('scams')
        .insert([{ ...payload, views: 0 }])
        .select();

      setIsSaving(false);

      if (error) {
        alert('Gagal menambah modus: ' + error.message);
      } else if (data) {
        alert('Modus baru berhasil ditambahkan!');
        setScams((prev) => [data[0], ...prev]);
        setIsModalOpen(false);
      }
    }
  };

  const handleDeleteScam = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus modus "${title}"?`)) return;

    const { error } = await supabase.from('scams').delete().eq('id', id);

    if (error) {
      alert('Gagal menghapus: ' + error.message);
    } else {
      setScams((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleViewScam = (slug: string) => {
    window.open(`/modus/${slug}`, '_blank');
  };

  const handleApproveSubmission = async (sub: Submission) => {
    setIsSaving(true);
    const slugToUse = generateSlug(sub.title);

    const { error: insertErr } = await supabase.from('scams').insert([
      {
        slug: slugToUse,
        title: sub.title,
        category: 'Pra-Keberangkatan',
        category_slug: 'pra-keberangkatan',
        risk: 'Waspada',
        summary: sub.description ? sub.description.substring(0, 150) + '...' : '',
        chronology: sub.description || '',
        views: 0
      }
    ]);

    if (insertErr) {
      alert('Gagal menerbitkan modus: ' + insertErr.message);
      setIsSaving(false);
      return;
    }

    const { error: updateErr } = await supabase
      .from('submissions')
      .update({ status: 'Approved' })
      .eq('id', sub.id);

    setIsSaving(false);

    if (!updateErr) {
      setSubmissions((prev) => prev.filter((item) => item.id !== sub.id));
      fetchScams();
    }
  };

  const handleRejectSubmission = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menolak laporan ini?')) return;

    const { error } = await supabase
      .from('submissions')
      .update({ status: 'Rejected' })
      .eq('id', id);

    if (!error) {
      setSubmissions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'hotline_wa', value: hotlineWA });

    setIsSaving(false);

    if (error) {
      alert('Gagal menyimpan pengaturan: ' + error.message);
    } else {
      alert('Pengaturan nomor WhatsApp SOS berhasil diperbarui!');
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
          <span>Memverifikasi Sesi Admin...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-800 border-r border-slate-700/60 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-700/60 mb-6">
            <div className="bg-red-600 p-2 rounded-xl text-white">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-white leading-none">GuardPMI</h2>
              <span className="text-[10px] text-amber-400 font-bold tracking-wider uppercase">Admin Dashboard</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('modus')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'modus' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" /> Kelola Modus
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'reports' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-5 h-5" /> Laporan Masuk
              </div>
              {submissions.length > 0 && (
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
                  {submissions.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'settings' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" /> Pengaturan Situs
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20"
        >
          <LogOut className="w-5 h-5" /> Keluar (Logout)
        </button>
      </aside>

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchAllData} 
              disabled={isLoading}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <span className="text-xs text-slate-400">Terhubung ke Supabase Database</span>
          </div>
        </div>

        {activeTab === 'modus' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-black text-white">Database Modus Penipuan</h1>
                <p className="text-slate-400 text-sm">Tambah, kelola, edit, atau hapus artikel riset penipuan</p>
              </div>
              <button 
                onClick={handleOpenAddModal}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-amber-400/20 transition-all"
              >
                <Plus className="w-5 h-5" /> Tambah Modus Baru
              </button>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900/60 text-xs uppercase font-bold text-slate-400 border-b border-slate-700/60">
                    <tr>
                      <th className="p-4">Judul Modus</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Tingkat Risiko</th>
                      <th className="p-4 text-center">Dibaca</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {scams.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white leading-snug">{item.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">/{item.slug}</div>
                        </td>
                        <td className="p-4 font-medium">{item.category}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                            item.risk === 'Sangat Berbahaya' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {item.risk}
                          </span>
                        </td>
                        <td className="p-4 text-center text-slate-400">{item.views || 0}x</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleViewScam(item.slug)}
                              className="p-2 bg-slate-700/80 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                              title="Lihat Tampilan Publik"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="p-2 bg-slate-700/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 rounded-lg transition-colors"
                              title="Edit Artikel"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteScam(item.id, item.title)}
                              className="p-2 bg-slate-700/80 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {scams.length === 0 && !isLoading && (
                <div className="text-center py-12 text-slate-500">
                  Belum ada data modus penipuan di database Supabase.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black text-white">Verifikasi Laporan Masyarakat</h1>
              <p className="text-slate-400 text-sm">Tinjau kiriman modus dari pengguna di halaman /submit</p>
            </div>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <div key={sub.id} className="bg-slate-800 p-5 rounded-2xl border border-slate-700/60 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amber-400/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-md border border-amber-400/30">
                        {sub.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(sub.created_at).toLocaleDateString('id-ID')} - Pelapor: {sub.reporter}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{sub.title}</h3>
                    {sub.description && (
                      <p className="text-sm text-slate-300 mt-2 bg-slate-900/50 p-3 rounded-xl border border-slate-700/40">
                        {sub.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                    <button 
                      onClick={() => handleApproveSubmission(sub)}
                      disabled={isSaving}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" /> Terbitkan ke Database
                    </button>
                    <button 
                      onClick={() => handleRejectSubmission(sub.id)}
                      className="px-3 py-2 bg-slate-700 hover:bg-red-600/30 text-red-400 rounded-xl text-xs transition-all"
                      title="Tolak"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {submissions.length === 0 && !isLoading && (
                <div className="text-center py-12 text-slate-500 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
                  Tidak ada laporan baru yang menunggu verifikasi.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-xl">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-white">Pengaturan Situs & Kontak SOS</h1>
              <p className="text-slate-400 text-sm">Ubah nomor kontak darurat dan konfigurasi tombol FAB floating</p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-slate-800 p-6 rounded-2xl border border-slate-700/60 space-y-5 shadow-xl">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nomor WhatsApp BP2MI (Tombol SOS FAB)
                </label>
                <div className="relative flex items-center">
                  <PhoneCall className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={hotlineWA}
                    onChange={(e) => setHotlineWA(e.target.value)}
                    placeholder="+6281119565222"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan'}
              </button>
            </form>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative my-8">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-black text-white mb-4">
              {editingScam ? 'Edit Modus Penipuan' : 'Tambah Modus Penipuan Baru'}
            </h2>
            
            <form onSubmit={handleSaveScam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Judul Modus</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFormData({
                      ...formData,
                      title: newTitle,
                      slug: editingScam ? formData.slug : generateSlug(newTitle)
                    });
                  }}
                  placeholder="Contoh: Lowongan Kerja Palsu Taiwan Visa Turis"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="lowongan-palsu-taiwan"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Negara Target</label>
                  <input
                    type="text"
                    value={formData.target_country}
                    onChange={(e) => setFormData({ ...formData, target_country: e.target.value })}
                    placeholder="Taiwan, Hong Kong, Malaysia"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Pra-Keberangkatan">Pra-Keberangkatan</option>
                    <option value="Love Scam / Asmara">Love Scam / Asmara</option>
                    <option value="Pinjol & Keuangan">Pinjol & Keuangan</option>
                    <option value="Kerja Sampingan Online">Kerja Sampingan Online</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tingkat Risiko</label>
                  <select
                    value={formData.risk}
                    onChange={(e) => setFormData({ ...formData, risk: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Sangat Berbahaya">Sangat Berbahaya</option>
                    <option value="Waspada">Waspada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Ringkasan Singkat (Summary)</label>
                <textarea
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu depan..."
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Kronologi / Cara Kerja Modus</label>
                <textarea
                  rows={5}
                  value={formData.chronology}
                  onChange={(e) => setFormData({ ...formData, chronology: e.target.value })}
                  placeholder="Jelaskan secara lengkap skenario penipuan..."
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded-xl text-sm transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-red-600/30"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingScam ? 'Simpan Perubahan' : 'Terbitkan ke Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}