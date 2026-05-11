"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function YearCollectionPage({ params }: { params: { year: string } }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mengambil data publikasi berdasarkan tahun
  useEffect(() => {
    async function fetchPapers() {
      setLoading(true);
      const { data, error } = await supabase
        .from('publikasi_ilmiah')
        .select('*')
        .eq('year', parseInt(params.year))
        .order('created_at', { ascending: false });
      
      if (data) setPapers(data);
      setLoading(false);
    }
    fetchPapers();
  };, [params.year]);

  // Fungsi untuk memvalidasi kode akses admin
  const handleCheckCode = (e: React.FormEvent) => {
    e.preventDefault();
    const secret = process.env.NEXT_PUBLIC_ADMIN_CODE;
    if (accessCode === secret) {
      setIsAuthorized(true);
      setAccessCode(''); // Bersihkan input password setelah berhasil
    } else {
      alert("Kode akses salah. Fitur manajemen hanya untuk admin.");
    }
  };

  // Fungsi untuk menghapus publikasi
  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus publikasi: "${title}"?`);
    if (confirmDelete) {
      const { error } = await supabase
        .from('publikasi_ilmiah')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Gagal menghapus data: ' + error.message);
      } else {
        alert('Publikasi berhasil dihapus.');
        // Refresh daftar paper setelah penghapusan
        setPapers(papers.filter(paper => paper.id !== id));
      }
    }
  };

  // --- TAMPILAN LOCK SCREEN UNTUK AKSES FITUR ADMIN ---
  const renderLockScreen = () => (
    <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] shadow-sm mb-10 text-center">
      <div className="mb-4 text-3xl">🔐</div>
      <h3 className="text-lg font-black text-prospect-blue-dark uppercase mb-2 tracking-tight">Mode Manajemen</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Halaman ini hanya untuk melihat. Masukkan kode akses untuk mengaktifkan fitur Edit dan Hapus.
      </p>
      <form onSubmit={handleCheckCode} className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
        <input 
          type="password" 
          placeholder="Masukkan Kode Akses Admin"
          className="w-full md:flex-1 p-4 bg-white border border-slate-200 rounded-xl focus:border-prospect-green outline-none text-center font-bold tracking-widest text-slate-900"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button type="submit" className="p-4 bg-gradient-to-r from-prospect-green to-prospect-blue text-white rounded-xl font-bold uppercase tracking-widest hover:shadow-lg transition-all text-xs">
          Buka Fitur Admin
        </button>
      </form>
    </div>
  );

  // --- TAMPILAN UTAMA HALAMAN KOLEKSI ---
  return (
    <div className="min-h-screen p-8 md:p-16 flex flex-col items-center bg-slate-50">
      
      {/* Tombol Kembali ke Beranda - Sekarang WARNA BIRU TEMA */}
      <div className="w-full max-w-6xl mb-12 text-left">
        <Link href="/" className="inline-flex items-center gap-2 text-prospect-blue hover:text-prospect-green font-bold transition-colors group">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm uppercase tracking-widest">Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="w-full max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-black text-prospect-blue-dark tracking-tighter uppercase mb-3">
            {params.year}
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Koleksi Publikasi</p>
          <div className="h-1.5 w-24 bg-prospect-green mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Tampilkan Lock Screen jika belum authorized */}
        {!isAuthorized && renderLockScreen()}

        {loading ? (
          <div className="text-center py-20 text-slate-400 italic">Memuat publikasi...</div>
        ) : (
          <div className="grid gap-8">
            {papers.length > 0 ? (
              papers.map((paper) => (
                <div key={paper.id} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:border-prospect-green/20 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center">
                  
                  {/* Dekorasi Aksen */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-prospect-blue opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                        {paper.journal_name || 'Prospect Research'}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-xl text-slate-900 group-hover:text-prospect-blue transition-colors leading-tight mb-4">
                      {paper.title}
                    </h4>
                    
                    <p className="text-slate-500 text-sm font-medium italic border-l-2 border-slate-100 pl-4 leading-relaxed max-w-2xl">
                      {paper.authors}
                    </p>
                  </div>

                  {/* Tombol Aksi - Menyesuaikan Warna Tema & Menampilkan Fitur Admin */}
                  <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-6 md:mt-0 relative z-10">
                    
                    {/* Tombol Baca Paper - Sekarang WARNA TEMA */}
                    <a 
                      href={paper.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-prospect-green to-prospect-blue text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-prospect-green/30 transition-all text-center"
                    >
                      Baca Paper ↗
                    </a>

                    {/* FITUR ADMIN - Hanya muncul jika password benar */}
                    {isAuthorized && (
                      <div className="flex gap-3 mt-4 md:mt-0">
                        {/* Tombol Edit */}
                        <Link 
                          href={`/upload?edit=${paper.id}`} // Kita akan sesuaikan halaman upload agar bisa mengedit
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold uppercase tracking-widest text-xs transition-all text-center"
                        >
                          Edit ✏️
                        </Link>
                        
                        {/* Tombol Hapus */}
                        <button 
                          onClick={() => handleDelete(paper.id, paper.title)}
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl font-bold uppercase tracking-widest text-xs transition-all text-center"
                        >
                          Hapus 🗑️
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              ))
            ) : (
              <div className="py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
                <div className="text-5xl mb-4 opacity-20">📄</div>
                <p className="text-slate-400 font-medium italic">Belum ada publikasi terdaftar di tahun {params.year}.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
