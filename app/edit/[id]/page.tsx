"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function EditPaperPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPaper() {
      const { data } = await supabase.from('publikasi_ilmiah').select('*').eq('id', params.id).single();
      if (data) {
        setTitle(data.title);
        setAuthors(data.authors);
        setYear(data.year.toString());
      }
    }
    fetchPaper();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('publikasi_ilmiah')
      .update({ title, authors, year: parseInt(year) })
      .eq('id', params.id);

    if (!error) {
      alert("Data berhasil diperbarui!");
      router.back();
    } else {
      alert("Gagal memperbarui data.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50 flex items-center justify-center">
      <form onSubmit={handleUpdate} className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-black text-[#003193] mb-8 uppercase tracking-tighter">Edit Data Jurnal</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Judul Jurnal</label>
            <input 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#039347]"
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Penulis</label>
            <input 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#039347]"
              value={authors} onChange={(e) => setAuthors(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Tahun</label>
            <input 
              type="number"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#039347]"
              value={year} onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button type="submit" className="flex-1 bg-[#039347] text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest">Simpan Perubahan</button>
          <button type="button" onClick={() => router.back()} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest">Batal</button>
        </div>
      </form>
    </div>
  );
}
