"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase'; // Pastikan path ini benar
import Link from 'next/link';

export default function YearCollectionPage({ params }: { params: { year: string } }) {
  const [papers, setPapers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

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
  }, [params.year]); // Error sebelumnya ada di baris ini (sudah diperbaiki)

  const checkAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const secret = process.env.NEXT_PUBLIC_ADMIN_CODE;
    if (password === secret) {
      setIsAdmin(true);
      setPassword('');
    } else {
      alert("Password salah!");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Hapus publikasi: "${title}"?`)) {
      await supabase.from('publikasi_ilmiah').delete().eq('id', id);
      setPapers(papers.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-16 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Tombol Kembali - Warna Biru Tema */}
        <Link href="/" className="text-[#003193] hover:text-[#039347] font-bold mb-10 inline-flex items-center gap-2 transition-colors">
          <span>←</span> KEMBALI KE BERANDA
        </Link>

        <div className="mb-12">
          <h1 className="text-7xl font-black text-slate-900 tracking-tighter">{params.year}</h1>
          <p className="text-slate-400 uppercase tracking-[0.3em] font-bold text-xs mt-2">Koleksi Publikasi</p>
        </div>

        {/* Panel Admin Ringkas */}
        {!isAdmin && (
          <form onSubmit={checkAdmin} className="mb-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            <p className="text-xs font-bold text-slate-400 uppercase flex-1">Akses Mode Edit/Hapus:</p>
            <input 
              type="password" 
              placeholder="Masukkan Kode" 
              className="p-3 bg-slate-50 border rounded-xl text-center font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-[#003193] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase">Buka</button>
          </form>
        )}

        <div className="grid gap-6">
          {loading ? (
            <p className="text-slate-400 italic">Memuat data...</p>
          ) : papers.map((paper) => (
            <div key={paper.id} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50 group transition-all hover:border-[#039347]/30">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#003193] transition-colors">{paper.title}</h3>
                  <p className="text-slate-500 text-sm mt-3 italic">{paper.authors}</p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {/* Tombol Baca - Warna Hijau-Biru Tema */}
                  <a 
                    href={paper.pdf_url} 
                    target="_blank" 
                    className="bg-gradient-to-r from-[#039347] to-[#003193] text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/10"
                  >
                    Baca Paper ↗
                  </a>

                  {isAdmin && (
                    <>
                      <button className="bg-slate-100 text-slate-600 px-5 py-3 rounded-xl font-bold text-[10px] uppercase">Edit</button>
                      <button 
                        onClick={() => handleDelete(paper.id, paper.title)}
                        className="bg-red-50 text-red-600 px-5 py-3 rounded-xl font-bold text-[10px] uppercase"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
