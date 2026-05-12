"use client";
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function TambahPortofolio() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    client_name: '',
    year: new Date().getFullYear(),
    category: 'Consulting',
    description: '',
    document_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('portofolio_prospect')
      .insert([formData]);

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      alert("Portofolio berhasil disimpan ke Ruang Kedua!");
      router.push('/portofolio');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-16">
      <div className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
        <h1 className="text-3xl font-black text-[#003193] mb-2 uppercase tracking-tighter">Input Portofolio</h1>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">Manajemen Rekam Jejak Profesional</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Nama Proyek</label>
            <input 
              type="text" required
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#039347] font-bold text-slate-700"
              onChange={(e) => setFormData({...formData, project_name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Nama Klien</label>
              <input 
                type="text" required
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#039347] font-bold text-slate-700"
                onChange={(e) => setFormData({...formData, client_name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Tahun Proyek</label>
              <input 
                type="number" required
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#039347] font-bold text-slate-700"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Kategori Bidang</label>
            <select 
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#039347] font-bold text-slate-700"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Consulting">Consulting</option>
              <option value="ESG & Sustainability">ESG & Sustainability</option>
              <option value="SROI Analysis">SROI Analysis</option>
              <option value="Community Development">Community Development</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Deskripsi Singkat Proyek</label>
            <textarea 
              rows={4}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#039347] font-medium text-slate-600"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Link Dokumen (Opsional)</label>
            <input 
              type="url"
              placeholder="https://..."
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#039347] text-slate-600"
              onChange={(e) => setFormData({...formData, document_url: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-[#039347] to-[#003193] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all"
          >
            {loading ? 'Menyimpan...' : 'Simpan ke Portofolio'}
          </button>
        </form>
      </div>
    </div>
  );
}
