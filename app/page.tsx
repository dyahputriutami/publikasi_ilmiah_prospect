"use client";
import { useState, useEffect } from 'react';
// Path import ini disesuaikan: keluar 3 tingkat (../../../) untuk menemukan folder 'lib'
import { supabase } from '../../../lib/supabase'; 
import Link from 'next/link';

export default function YearCollectionPage({ params }: { params: { year: string } }) {
  const [papers, setPapers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Mengambil data publikasi berdasarkan tahun
  useEffect(() => {
    async function fetchPapers() {
      setLoading(true);
      const { data } = await supabase
        .from('publikasi_ilmiah')
        .select('*')
        .eq('year', parseInt(params.year))
        .order('created_at', { ascending: false });
      
      if (data) setPapers(data);
      setLoading(false);
    }
    fetchPapers();
  }, [params.year]);

  // Fungsi validasi admin menggunakan Environment Variable
  const handleAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const secret = process.env.NEXT_PUBLIC_ADMIN_CODE;
    if (password === secret) {
      setIsAdmin(true);
      setPassword('');
    } else {
      alert("Password Admin Salah");
    }
  };

  // Fungsi hapus data
  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus publikasi: "${title}"?`)) {
      const { error } = await supabase.from('publikasi_ilmiah').delete().eq('id', id);
      if (!error) {
        setPapers(papers.filter(p => p.id !== id));
        alert("Berhasil dihapus.");
      }
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-16 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Navigasi - Warna Biru Prospect */}
        <Link href="/" className="text-[#003193] hover:text-[#039347] font-bold mb-10 inline-flex items-center gap-2 transition-colors uppercase tracking-widest text-xs">
          <span>←</span> Kembali ke Beranda
        </Link>

        <div className="mb-12">
          <h1 className="text-7xl font-black text-slate-900 tracking-tighter">{params.year}</h1>
          <p className="text-slate-400 uppercase tracking-[0.3em] font-bold text-xs mt-2">Koleksi Publikasi</p>
          <div className="h-1.5 w-20 bg-[#039347] mt-4 rounded-full"></div>
        </div>

        {/* Akses Admin - Menggunakan Kode 'prospect2026' */}
        {!isAdmin && (
          <form onSubmit={handleAdmin} className="mb-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1">Aktivasi Mode Manajemen:</p>
            <input 
              type="password" 
              placeholder="Masukkan Kode Admin" 
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold outline-none focus:border-[#039347]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-[#003193] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#039347] transition-colors">
              Buka Akses
            </button>
          </form>
        )}

        <div className="grid gap-6">
          {loading ? (
            <p className="text-slate-400 italic">Memuat arsip...</p>
          ) : papers.length > 0 ? (
            papers.map((paper) => (
              <div key={paper.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 group transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#003193] transition-colors">{paper.title}</h3>
                    <p className="text-slate-500 text-sm mt-4 italic border-l-2 border-slate-100 pl-4">{paper.authors}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {/* Tombol Baca - Warna Hijau/Biru Prospect */}
                    <a 
                      href={paper.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none bg-gradient-to-r from-[#039347] to-[#003193] text-white px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg text-center"
                    >
                      Baca Paper ↗
                    </a>

                    {/* Tombol Khusus Admin */}
                    {isAdmin && (
                      <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none bg-slate-100 text-slate-600 px-6 py-4 rounded-xl font-bold text-[10px] uppercase">Edit</button>
                        <button 
                          onClick={() => handleDelete(paper.id, paper.title)}
                          className="flex-1 md:flex-none bg-red-50 text-red-600 px-6 py-4 rounded-xl font-bold text-[10px] uppercase"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
              <p className="text-slate-400 italic">Belum ada publikasi di tahun ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
