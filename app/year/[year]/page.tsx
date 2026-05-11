"use client";
import { useState, useEffect } from 'react';
/* Keluar 3 tingkat untuk mencapai folder lib sesuai struktur GitHub Anda */
import { supabase } from '../../../lib/supabase'; 
import { checkIsAdmin } from '../../../lib/auth';
import Link from 'next/link';

export default function YearCollectionPage({ params }: { params: { year: string } }) {
  const [papers, setPapers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memastikan status admin terdeteksi dari cookie session
    setIsAdmin(checkIsAdmin());

    async function fetchPapers() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('publikasi_ilmiah')
          .select('*')
          .eq('year', parseInt(params.year))
          .order('created_at', { ascending: false });
        
        if (data) setPapers(data);
      } catch (err) {
        console.error("Error fetching papers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
    /* Perbaikan Syntax Error: Pastikan tidak ada tanda titik koma (;) di antara kurung tutup dan koma */
  }, [params.year]);

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus paper: "${title}"?`);
    if (confirmDelete) {
      const { error } = await supabase
        .from('publikasi_ilmiah')
        .delete()
        .eq('id', id);

      if (!error) {
        setPapers(papers.filter(p => p.id !== id));
      } else {
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-16 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/" className="text-[#003193] font-bold mb-10 inline-flex items-center gap-2 transition-colors uppercase tracking-widest text-[10px]">
          <span>←</span> Kembali ke Beranda
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-7xl font-black text-slate-900 tracking-tighter">
              {params.year}
            </h1>
            {isAdmin && (
              <span className="px-3 py-1 bg-[#039347] text-white text-[9px] font-bold rounded-full uppercase tracking-widest animate-pulse">
                Admin Mode Active
              </span>
            )}
          </div>
          <p className="text-slate-400 uppercase tracking-[0.3em] font-bold text-xs mt-2 ml-1">Koleksi Publikasi</p>
          <div className="h-1.5 w-20 bg-[#039347] mt-4 rounded-full ml-1"></div>
        </div>

        <div className="grid gap-6">
          {loading ? (
            <p className="text-slate-400 italic animate-pulse">Menghubungkan ke database...</p>
          ) : papers.length > 0 ? (
            papers.map((paper) => (
              <div key={paper.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 group hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#003193] transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-4 italic border-l-2 border-slate-100 pl-4">
                      {paper.authors}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {/* Tombol Baca sesuai identitas visual Prospect */}
                    <a 
                      href={paper.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none bg-gradient-to-r from-[#039347] to-[#003193] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-lg text-center hover:opacity-90 transition-opacity"
                    >
                      Baca Paper ↗
                    </a>

                    {/* Tombol Manajemen muncul otomatis jika Admin sudah login */}
                    {isAdmin && (
                      <div className="flex gap-2 w-full md:w-auto">
                        <Link 
                          href={`/edit/${paper.id}`} 
                          className="flex-1 md:flex-none bg-slate-100 text-slate-600 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase hover:bg-slate-200 transition-colors text-center"
                        >
                          EDIT
                        </Link>
                        <button 
                          onClick={() => handleDelete(paper.id, paper.title)}
                          className="flex-1 md:flex-none bg-red-50 text-red-600 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase hover:bg-red-100 transition-colors"
                        >
                          HAPUS
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
              <p className="text-slate-400 italic">Belum ada publikasi yang tersedia untuk tahun ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
