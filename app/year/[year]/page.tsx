import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default async function YearPage({ params }: { params: { year: string } }) {
  const selectedYear = params.year;

  // Mengambil data paper berdasarkan tahun yang diklik di sidebar
  const { data: papers } = await supabase
    .from('publikasi_ilmiah')
    .select('*')
    .eq('year', selectedYear)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-12">
          <Link href="/" className="text-red-900 font-bold text-sm hover:underline mb-4 block">
            ← Kembali ke Beranda
          </Link>
          <div className="flex items-end gap-4">
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
              {selectedYear}
            </h1>
            <p className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-sm">
              Koleksi Publikasi
            </p>
          </div>
        </header>

        <section>
          <div className="grid gap-6">
            {papers && papers.length > 0 ? (
              papers.map((paper) => (
                <div key={paper.id} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-900 transition-colors mb-2">
                        {paper.title}
                      </h3>
                      <p className="text-slate-500 font-medium mb-4 italic">
                        {paper.authors}
                      </p>
                      <div className="inline-block bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-400 border border-slate-100">
                         {paper.journal_name || 'General Publication'}
                      </div>
                    </div>
                    
                    <a 
                      href={paper.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-red-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-red-950 transition-all text-center shadow-lg active:scale-95"
                    >
                      Baca Paper
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                <div className="text-4xl mb-4 text-slate-300">📁</div>
                <p className="text-slate-400 font-medium italic">
                  Belum ada publikasi yang terdaftar untuk tahun {selectedYear}.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
