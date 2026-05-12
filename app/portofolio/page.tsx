"use client";
import { useState, useEffect } from 'react';
/* Pastikan path "../../" sudah benar untuk mengakses folder lib */
import { supabase } from '../../lib/supabase'; 
import { checkIsAdmin } from '../../lib/auth';
import Link from 'next/link';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memeriksa status admin untuk memunculkan tombol tambah/edit
    setIsAdmin(checkIsAdmin());

    async function fetchPortfolio() {
      setLoading(true);
      try {
        // Mengambil data KHUSUS dari tabel portofolio_prospect
        const { data, error } = await supabase
          .from('portofolio_prospect')
          .select('*')
          .order('year', { ascending: false });
        
        if (data) setProjects(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Ruang Portofolio */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-6xl font-black text-[#003193] tracking-tighter uppercase leading-[0.9]">
              REKAM JEJAK <br/> <span className="text-[#039347]">PROYEK</span>
            </h1>
            <p className="text-slate-400 uppercase tracking-[0.3em] font-bold text-[10px] mt-6 ml-1">
              Ruang Portofolio & Dokumen Strategis Prospect Institute
            </p>
            <div className="h-1.5 w-24 bg-[#039347] mt-4 rounded-full ml-1"></div>
          </div>

          {/* PROSES 3: Navigasi ke halaman input portofolio yang benar */}
          {isAdmin && (
            <Link 
              href="/portofolio/tambah" 
              className="bg-gradient-to-r from-[#039347] to-[#003193] text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              + Input Portofolio Baru
            </Link>
          )}
        </div>

        {/* List Tampilan Proyek */}
        <div className="grid gap-8">
          {loading ? (
            <div className="py-10 text-slate-400 italic animate-pulse tracking-widest text-xs font-bold uppercase">
              Membuka arsip proyek profesional...
            </div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                  <div className="flex-1">
                    <div className="flex gap-3 mb-6">
                      <span className="px-4 py-1.5 bg-blue-50 text-[#003193] rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100">
                        TAHUN {project.year}
                      </span>
                      <span className="px-4 py-1.5 bg-green-50 text-[#039347] rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                        {project.category || 'CONSULTING'}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#003193] transition-colors leading-tight mb-3 uppercase tracking-tighter">
                      {project.project_name}
                    </h3>
                    <p className="text-[#039347] font-extrabold text-xs uppercase tracking-widest mb-4">
                      Klien: {project.client_name}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-4xl italic">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    {project.document_url ? (
                      <a 
                        href={project.document_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full md:w-auto bg-slate-100 text-[#003193] px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center hover:bg-[#003193] hover:text-white transition-all shadow-sm"
                      >
                        Buka Dokumen ↗
                      </a>
                    ) : (
                      <div className="text-right">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] italic">
                          Internal Only
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center border-4 border-dashed border-slate-200 rounded-[4rem]">
              <div className="text-4xl mb-4">📂</div>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Belum ada data di Ruang Portofolio
              </p>
              {isAdmin && (
                <Link href="/portofolio/tambah" className="text-[#039347] text-[10px] font-black uppercase underline mt-4 block tracking-widest">
                  Klik untuk mengisi data pertama
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
