"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('2026');
  const [journal, setJournal] = useState('');
  const [abstract, setAbstract] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('publikasi_ilmiah')
      .insert([
        { 
          title, 
          authors, 
          year: parseInt(year), 
          journal_name: journal, 
          abstract, 
          pdf_url: pdfUrl 
        },
      ]);

    if (error) {
      alert('Gagal menyimpan data: ' + error.message);
    } else {
      alert('Data publikasi berhasil disimpan!');
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 md:p-16 flex flex-col items-center">
      
      {/* NAVIGASI KEMBALI - SEKARANG MENGGUNAKAN WARNA TEMA */}
      <div className="w-full max-w-2xl mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-prospect-blue hover:text-prospect-green font-bold transition-colors group">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm uppercase tracking-widest">Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 relative overflow-hidden">
        {/* Aksen dekoratif di pojok kartu */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-prospect-green/5 rounded-full -mr-16 -mt-16"></div>
        
        <div className="mb-10 text-center relative z-10">
          <h2 className="text-2xl font-black text-prospect-blue-dark uppercase tracking-tight">Formulir Publikasi Baru</h2>
          <div className="h-1.5 w-16 bg-prospect-green mx-auto mt-3 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* JUDUL */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Judul Artikel / Paper</label>
            <input 
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Analisis Kebijakan Publik..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-prospect-green focus:ring-4 focus:ring-prospect-green/10 transition-all text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PENULIS */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Penulis</label>
              <input 
                type="text" required value={authors} onChange={(e) => setAuthors(e.target.value)}
                placeholder="Nama Penulis"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-prospect-green transition-all text-slate-800"
              />
            </div>
            {/* TAHUN */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Tahun Publikasi</label>
              <select 
                value={year} onChange={(e) => setYear(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-prospect-green transition-all text-slate-800"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          {/* JURNAL */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Nama Jurnal / Prosiding</label>
            <input 
              type="text" value={journal} onChange={(e) => setJournal(e.target.value)}
              placeholder="Masukkan nama jurnal atau penerbit"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-prospect-green transition-all text-slate-800"
            />
          </div>

          {/* ABSTRAK */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Abstrak Singkat</label>
            <textarea 
              rows={4} value={abstract} onChange={(e) => setAbstract(e.target.value)}
              placeholder="Tuliskan ringkasan singkat artikel..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-prospect-green transition-all text-slate-800"
            ></textarea>
          </div>

          {/* LINK PDF */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Tautan PDF (Google Drive/Dropbox)</label>
            <input 
              type="url" required value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="https://link-file-anda.com"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-prospect-green transition-all text-slate-800"
            />
          </div>

          {/* TOMBOL SIMPAN - GRADASI TEMA */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-5 bg-gradient-to-r from-prospect-green to-prospect-blue hover:from-prospect-blue hover:to-prospect-green text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-prospect-green/30 transition-all transform hover:-translate-y-1 disabled:opacity-50"
          >
            {loading ? 'Sedang Menyimpan...' : 'Simpan Publikasi'}
          </button>
        </form>
      </div>
    </div>
  );
}
