"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Sesuaikan path import Anda
import Link from 'next/link';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchPortfolio() {
      const { data } = await supabase
        .from('portofolio_prospect')
        .select('*')
        .order('year', { ascending: false });
      if (data) setProjects(data);
    }
    fetchPortfolio();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar tetap di sini sesuai layout utama Anda */}
      <main className="flex-1 p-12 bg-slate-50">
        <h1 className="text-4xl font-black text-[#003193] mb-2 uppercase tracking-tighter">
          Portofolio Proyek
        </h1>
        <p className="text-slate-400 uppercase tracking-widest text-xs mb-8">
          Daftar Rekam Jejak dan Dokumen Strategis
        </p>

        <div className="grid gap-6">
          {projects.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="px-3 py-1 bg-[#039347] text-white text-[10px] font-bold rounded-full uppercase mr-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2">{item.project_name}</h3>
                  <p className="text-slate-500 text-sm italic">{item.client_name}</p>
                </div>
                <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-bold text-[10px] uppercase">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
