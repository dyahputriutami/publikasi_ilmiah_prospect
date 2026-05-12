"use client";
import { useState, useEffect } from 'react';
// GUNAKAN ../../ UNTUK KELUAR DARI FOLDER 'portofolio' DAN 'app'
import { supabase } from '../../lib/supabase'; 
import { checkIsAdmin } from '../../lib/auth';
import Link from 'next/link';

export default function PortfolioPage() {
  // ... sisa kode lainnya tetap sama

  useEffect(() => {
    // Cek status admin untuk fitur edit/hapus portofolio nanti
    setIsAdmin(checkIsAdmin());

    async function fetchPortfolio() {
      setLoading(true);
      const { data, error } = await supabase
        .from('portofolio_prospect')
        .select('*')
        .order('year', { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-8 py-16">
        
        {/* Header Section - Identik dengan Beranda Jurnal */}
        <section className="mb-20 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-5xl font-black text-[#003193] tracking-tighter uppercase mb-4">
              Portofolio Proyek
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Rekam jejak profesional dan dokumen strategis yang telah disusun oleh Prospect Institute.
            </p>
            <div className="h-1.5 w-20 bg-[#039347] mt-6 rounded-full"></div>
          </div>

          {/* Tombol Tambah Portofolio (Hanya muncul jika admin) */}
          {isAdmin && (
            <Link 
              href="/portofolio/tambah" 
              className="bg-[#039347] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              + Tambah Portofolio
            </Link>
          )}
        </section>

        {/* List Section */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
            <span className="w-2 h-2 bg-[#039347] rounded-full animate-pulse"></span>
            Daftar Pekerjaan
          </h2>

          {loading ? (
            <div className="py-10 text-slate-400 italic animate-pulse">Memuat data portofolio...</div>
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
                      <p className="text-[#039347] font-bold text-sm mb-4 uppercase tracking-widest">
                        {project.client_name}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-3xl">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Aksi Portofolio */}
                    <div className="flex flex-col gap-2">
                      {project.document_url && (
                        <a 
                          href={project.document_url} 
                          target="_blank" 
                          className="bg-slate-100 text-[#003193] px-6 py-3 rounded-xl font-bold text-[10px] uppercase text-center hover:bg-[#003193] hover:text-white transition-all"
                        >
                          Lihat Dokumen
                        </a>
                      )}
                      {isAdmin && (
                        <div className="flex gap-2">
                          <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-[9px] uppercase">Edit</button>
                          <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-[9px] uppercase">Hapus</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
              <p className="text-slate-400 italic">Belum ada portofolio yang terdaftar.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
