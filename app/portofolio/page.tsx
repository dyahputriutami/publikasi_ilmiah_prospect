"use client";
import { useState, useEffect } from 'react';
/* Perbaikan Path: Keluar 2 tingkat dari app/portofolio ke root folder */
import { supabase } from '../../lib/supabase'; 
import { checkIsAdmin } from '../../lib/auth';
import Link from 'next/link';

export default function PortfolioPage() {
  // 1. Definisikan State (Ini yang tadi menyebabkan error 'Cannot find name')
  const [projects, setProjects] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. Cek status admin
    setIsAdmin(checkIsAdmin());

    async function fetchPortfolio() {
      setLoading(true);
      try {
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
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-8 py-16">
        
        <section className="mb-20 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-5xl font-black text-[#003193] tracking-tighter uppercase mb-4">
              Portofolio Proyek
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Rekam jejak profesional dan dokumen strategis Prospect Institute.
            </p>
            <div className="h-1.5 w-20 bg-[#039347] mt-6 rounded-full"></div>
          </div>

          {isAdmin && (
            <Link 
              href="/admin" 
              className="bg-[#039347] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              + Tambah Data
            </Link>
          )}
        </section>

        <section>
          {loading ? (
            <div className="py-10 text-slate-400 italic">Memuat data portofolio...</div>
          ) : (
            <div className="grid gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-4">
                        <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-[#039347] uppercase">
                          {project.year}
                        </span>
                        <span className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-[10px] font-black text-[#003193] uppercase">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#003193] transition-colors mb-2 leading-tight">
                        {project.project_name}
                      </h3>
                      <p className="text-[#039347] font-bold text-sm mb-4 uppercase tracking-widest">{project.client_name}</p>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">{project.description}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {project.document_url && (
                        <a href={project.document_url} target="_blank" className="bg-slate-100 text-[#003193] px-6 py-3 rounded-xl font-bold text-[10px] uppercase text-center hover:bg-[#003193] hover:text-white transition-all">
                          Lihat Dokumen
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
