"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Pastikan path sesuai
import Link from "next/link";

export default function PortofolioPage() {
  const [proyek, setProyek] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 1. Cek apakah user adalah admin (mengikuti logika publikasi ilmiah Anda)
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
    
    fetchProyek();
  }, []);

  async function fetchProyek() {
    const { data } = await supabase.from("portofolio_prospect").select("*").order("created_at", { ascending: false });
    if (data) setProyek(data);
  }

  // 2. Fungsi Hapus dengan Konfirmasi
  async function handleHapus(id: string, nama: string) {
    const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus proyek: ${nama}?`);
    if (konfirmasi) {
      const { error } = await supabase.from("portofolio_prospect").delete().eq("id", id);
      if (!error) {
        alert("Data berhasil dihapus");
        fetchProyek(); // Refresh data
      } else {
        alert("Gagal menghapus: " + error.message);
      }
    }
  }

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-[#003193] uppercase">Portofolio Proyek</h1>
        {isAdmin && (
          <Link href="/portofolio/tambah" className="bg-[#039347] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest">
            + Tambah Data
          </Link>
        )}
      </div>

      <div className="grid gap-6">
        {proyek.map((p: any) => (
          <div key={p.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group">
            <h2 className="text-xl font-bold text-slate-800 mb-1">{p.nama_proyek}</h2>
            <p className="text-[#039347] font-bold text-sm mb-4">{p.nama_klien} — {p.tahun_proyek}</p>
            <p className="text-slate-500 text-sm italic">"{p.deskripsi_singkat}"</p>

            {/* 3. MENU EDIT & HAPUS (Hanya muncul jika isAdmin true) */}
            {isAdmin && (
              <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  href={`/portofolio/edit/${p.id}`}
                  className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleHapus(p.id, p.nama_proyek)}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                >
                  Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
