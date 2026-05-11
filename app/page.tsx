import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default async function Home() {
  // Mengambil data publikasi terbaru
  const { data: latestPapers } = await supabase
    .from('publikasi_ilmiah')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section - Dibuat lebih ringkas */}
        <header className="mb-16 border-b border-slate-100 pb-10">
          <h1 className="text-4xl font-black text-prospect-blue-dark tracking-tight mb-4 uppercase">
            Publikasi Ilmiah Prospect
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Pusat arsip digital untuk artikel ilmiah, riset, dan laporan teknis 
            yang dikelola oleh Prospect Institute.
          </p>
        </header>

        {/* Latest Releases Section - Langsung menjadi fokus utama */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center">
              <span className="w-3 h-3 bg-prospect-green rounded-full mr-4 shadow-[0_0_10px_rgba(3,147,71,0.5)]"></span>
              Rilis Terbaru
            </h2>
            <div className="text-sm font-medium text-slate-400 bg-slate-50 px-4 py-1 rounded-full border border-slate-100">
              {latestPapers?.length || 0} Artikel Terdaftar
            </div>
          </div>
          
          <div className="grid gap-6">
            {latestPapers && latestPapers.length > 0 ? (
              latestPapers.map((paper) => (
                <div key={paper.id} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-prospect-green/20 transition-all group relative overflow-hidden">
                  {/* Aksen gradasi halus pada hover */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-prospect-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-prospect-green bg-prospect-green/10 px-3 py-1 rounded-md">
                          {paper.year}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">
                          {paper.journal_name || 'Prospect Research'}
                        </span>
                      </div>
                      
                      <h4 className="font-bold text-xl text-slate-900 group-hover:text-prospect-blue transition-colors leading-tight">
                        {paper.title}
                      </h4>
                      
                      <p className="text-slate-500 text-sm mt-4 font-medium italic border-l-2 border-slate-100 pl-4">
                        {paper.authors}
                      </p>
                    </div>

                    <a 
                      href={paper.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-prospect-blue hover:bg-prospect-blue hover:text-white transition-all shadow-inner group-hover:shadow-lg"
                      title="Baca Paper"
                    >
                      <span className="text-xl">↗</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
                <div className="text-5xl mb-4 opacity-20">📄</div>
                <p className="text-slate-400 font-medium italic">Belum ada publikasi yang dirilis saat ini.</p>
              </div>
            )}
          </div>
        </section>

        {/* Tombol Unggah Tetap di Pojok Bawah sebagai Navigasi Utama */}
        <Link href="/upload" className="fixed bottom-10 right-10 flex items-center gap-3 px-8 py-5 bg-prospect-green text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 hover:bg-prospect-blue transition-all shadow-2xl z-50 group border-b-4 border-black/20">
          <span className="text-2xl group-hover:rotate-90 transition-transform">+</span>
          Unggah Paper
        </Link>

      </div>
    </div>
  );
}
