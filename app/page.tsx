"use client";
import { useState, useEffect } from 'react';
// Jalur diperbaiki agar tidak menyebabkan "Module not found" di Vercel
import { supabase } from '../lib/supabase'; 
import Link from 'next/link';

export default function HomePage() {
  const [latestPapers, setLatestPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatest() {
      setLoading(true);
      const { data, error } = await supabase
        .from('publikasi_ilmiah')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Menampilkan 3 rilis terbaru saja di beranda
      
      if (data) setLatestPapers(data);
      setLoading(false);
    }
    fetchLatest();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-8 py-16">
        
        {/* Header Section */}
        <section className="mb-20">
          <h1 className="text-5xl font-black text-[#003193] tracking-tighter uppercase mb-4">
            Publikasi Ilmiah Prospect
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Pusat arsip digital untuk artikel ilmiah, riset, dan laporan teknis yang dikelola oleh Prospect Institute.
          </p>
          <div className="h-1.5 w-20 bg-[#039347] mt-6 rounded-full"></div>
        </section>

        {/* Latest Releases Section */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
              <span className="w-2 h-2 bg-[#039347] rounded-full animate-pulse"></span>
              Rilis Terbaru
            </h2>
            <span className="text-[10px] font-bold text-slate-300 uppercase italic">
              {latestPapers.length} Artikel Terdaftar
            </span>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 italic tracking-widest">
              Menghubungkan ke database...
            </div>
          ) : (
            <div className="grid gap-8">
              {latestPapers.length > 0 ? (
                latestPapers.map((paper) => (
                  <div key={paper.id} className="group relative bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-[#039347]/20 transition-all duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-[#039347] uppercase tracking-widest">
                            {paper.year}
                          </span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                            {paper.journal_name || 'Prospect Research'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#003193] transition-colors leading-tight mb-4">
                          {paper.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium italic border-l-2 border-slate-100 pl-4">
                          {paper.authors}
                        </p>
                      </div>
                      
                      <a 
                        href={paper.pdf_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-gradient-to-br group-hover:from-[#039347] group-hover:to-[#003193] group-hover:text-white rounded-full transition-all duration-500 shadow-inner"
                      >
                        <span className="text-2xl group-hover:rotate-45 transition-transform">↗</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
                  <p className="text-slate-400 font-medium italic">Belum ada publikasi yang diunggah.</p>
                </div>
              )}
            </div>
          )}
        </section>

      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto px-8 py-10 border-t border-slate-50 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">
          Prospect Institute &copy; 2026 • Sustainability & Impact
        </p>
      </footer>
    </div>
  );
}
