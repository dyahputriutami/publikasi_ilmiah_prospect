"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

export default function PortfolioYearPage() {
  const { year } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYearlyProjects() {
      setLoading(true);
      const { data } = await supabase
        .from('portofolio_prospect')
        .select('*')
        .eq('year', year) // Filter hanya berdasarkan tahun yang diklik
        .order('created_at', { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchYearlyProjects();
  }, [year]);

  return (
    <div className="min-h-screen bg-slate-50 p-16">
      <h1 className="text-5xl font-black text-[#003193] mb-2 uppercase tracking-tighter">
        PROYEK <span className="text-[#039347]">{year}</span>
      </h1>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-12">
        Showroom Rekam Jejak Profesional
      </p>

      <div className="grid gap-6">
        {loading ? (
          <p className="animate-pulse italic">Mencari arsip tahun {year}...</p>
        ) : projects.length > 0 ? (
          projects.map((p) => (
            <div key={p.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="text-xl font-bold text-slate-800">{p.project_name}</h3>
               <p className="text-[#039347] font-bold text-sm mb-2 uppercase">{p.client_name}</p>
               <p className="text-slate-500 text-sm italic">"{p.description}"</p>
            </div>
          ))
        ) : (
          <div className="p-20 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem]">
            <p className="text-slate-400 font-bold uppercase text-[10px]">Tidak ada proyek di tahun {year}</p>
          </div>
        )}
      </div>
    </div>
  );
}
