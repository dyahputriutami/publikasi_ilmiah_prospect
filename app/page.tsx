import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default async function Home() {
  // Mengambil 3 data publikasi terbaru
  const { data: latestPapers } = await supabase
    .from('publikasi_ilmiah')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-4xl font-black text-slate-950 tracking-tight mb-4 uppercase">
            Publikasi Ilmiah Prospect
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Pusat arsip digital untuk artikel ilmiah, riset, dan laporan teknis 
            yang dikelola oleh Prospect Institute.
          </p>
        </header>

        {/* Status & Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Kartu Gradasi Keren: Menggunakan .bg-gradient-prospect-card */}
          <div className="bg-gradient-prospect-card p-10 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] opacity-70 mb-8 text-white/80">Koneksi Sistem</h3>
            <div>
              <p className="text-5xl font-black mb-2">Terintegrasi</p>
              <p className="text-white/80 text-sm">Supabase Real-time Database</p>
            </div>
          </div>
          
          <Link href="/upload" className="group bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-prospect-green transition-all shadow-sm hover:shadow-2xl flex flex-col justify-between">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-prospect-green mb-8">Administrasi</h3>
            <div>
              <p className="text-3xl font-bold text-slate-900 group-hover:text-prospect-green-dark">+ Tambah Publikasi</p>
              <p className="text-slate-500 text-sm mt-2">Input data artikel baru ke dalam sistem</p>
            </div>
          </Link>
        </div>

        {/* Latest Releases */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center">
              {/* Titik indikator menggunakan Royal Blue */}
              <span className="w-2 h-2 bg-prospect-blue rounded-full mr-3"></span>
              Rilis Terbaru
            </h2>
            <div className="h-px flex-1 bg-slate-100 mx-6"></div>
          </div>
          
          <div className="grid gap-4 relative z-0">
            {latestPapers && latestPapers.length > 0 ? (
              latestPapers.map((paper) => (
                <div key={paper.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:border-prospect-green/30 transition-colors group">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-prospect-green transition-colors">{paper.title}</h4>
                    {/* Aksen Tahun menggunakan Emerald Green */}
                    <span className="text-xs font-bold bg-prospect-green/10 text-prospect-green px-3 py-1 rounded-full">{paper.year}</span>
                  </div>
                  <p className="text-slate-600 text-sm mt-2 italic">{paper.authors}</p>
                </div>
              ))
            ) : (
              <div className="py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 text-center">
                <p className="text-slate-400 font-medium italic">Menunggu sinkronisasi data pertama...</p>
              </div>
            )}
          </div>
        </section>

        {/* Tombol Terapung "Unggah Paper" - Menggunakan Emerald Green */}
        <Link href="/upload" className="fixed bottom-10 right-10 flex items-center gap-3 px-8 py-5 bg-prospect-green text-white rounded-full font-black uppercase tracking-widest hover:scale-105 hover:bg-prospect-blue transition-all shadow-2xl z-50 group">
          <span className="text-2xl group-hover:rotate-90 transition-transform">+</span>
          Unggah Paper
        </Link>

      </div>
    </div>
  );
}
