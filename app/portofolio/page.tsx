"use client";

import { useState, useEffect } from "react";
// Menggunakan path relatif untuk memastikan file ditemukan saat build
import { supabase } from "../../lib/supabase"; 
import Link from "next/link";

export default function PortofolioPage() {
  const [proyek, setProyek] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi pengecekan status admin dari localStorage
    const checkAdminStatus = () => {
      try {
        const adminStatus = localStorage.getItem("isAdmin") === "true";
        setIsAdmin(adminStatus);
      } catch (err) {
        console.error("Gagal mengakses localStorage:", err);
      }
    };

    checkAdminStatus();
    fetchProyek();
  }, []);

  async function fetchProyek() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("portofolio_prospect")
        .select("*")
        .order("year", { ascending: false });
      
      if (data) setProyek(data);
      if (error) throw error;
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fungsi Hapus Data
  async function handleHapus(id: string, nama: string) {
    const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus proyek: ${nama}?`);
    if (konfirmasi) {
      try {
        const { error } = await supabase
          .from("portofolio_prospect")
          .delete()
          .eq("id", id);
        
        if (error) throw error;
        
        alert("Data berhasil dihapus dari database.");
        fetchProyek(); // Refresh list setelah hapus
      } catch (err: any) {
        alert("Gagal menghapus: " + err.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-6xl font-black text-[#003193] tracking-tighter uppercase leading-[0.9]">
              REKAM JEJAK <br/> <span className="text-[#039347]">PROYEK</span>
            </h1>
            <p className="text-slate-400 uppercase tracking-[0.3em] font-bold text-[10px] mt-6 ml-1">
              Database Portofolio Profesional Prospect Institute
            </p>
          </div>

          {isAdmin && (
            <Link 
              href="/portofolio/tambah" 
              className="bg-[#039347] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              + Tambah Data Baru
            </Link>
          )}
        </div>

        {/* List Card Proyek */}
        <div className="grid gap-6">
          {loading ? (
            <p className="text-slate-400 italic animate-pulse uppercase text-[10px] font-black tracking-widest">
              Memuat data portofolio...
            </p>
          ) : proyek.length > 0 ? (
            proyek.map((p) => (
              <div 
                key={p.id} 
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group relative"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase">
                        {p.year}
                      </span>
                      <span className="px-3 py-1 bg-green-50 text-[#039347] rounded-lg text-[9px] font-black uppercase">
                        {p.category || 'Consulting'}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tighter mb-2">
                      {p.project_name}
                    </h3>
                    <p className="text-[#039347] font-black text-xs uppercase tracking-widest mb-4">
                      Klien: {p.client_name}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-3xl italic">
                      {p.description}
                    </p>
                  </div>

                  {/* Tombol Akses & Admin */}
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    {p.document_url && (
                      <a 
                        href={p.document_url} 
                        target="_blank" 
                        className="bg-slate-100 text-[#003193] px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest text-center hover:bg-[#003193] hover:text-white transition-all"
                      >
                        Lihat Dokumen ↗
                      </a>
                    )}
                    
                    {/* MENU ADMIN: EDIT & HAPUS */}
                    {isAdmin && (
                      <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link 
                          href={`/portofolio/edit/${p.id}`}
                          className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase text-center hover:bg-blue-600 hover:text-white transition-all"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleHapus(p.id, p.project_name)}
                          className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase text-center hover:bg-red-600 hover:text-white transition-all"
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
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Belum ada data portofolio yang terdaftar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
