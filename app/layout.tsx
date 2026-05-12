import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arsip Prospect Institute",
  description: "Pusat Data Publikasi dan Portofolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Definisi Tahun untuk masing-masing ruang
  const portfolioYears = [2026, 2025, 2024];
  const journalYears = [2026, 2025, 2024, 2023, 2022, 2021];

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          
          {/* SIDEBAR */}
          <aside className="w-72 bg-gradient-to-b from-[#039347] to-[#003193] flex flex-col h-screen sticky top-0 overflow-y-auto shadow-xl z-50">
            
            {/* Logo Section */}
            <div className="p-8 border-b border-white/10">
              <Link href="/" className="block">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                  <h2 className="text-xl font-black text-white tracking-tighter leading-none">
                    PROSPECT<br/><span className="text-white/70 text-[10px] tracking-[0.3em] uppercase font-bold">Institute</span>
                  </h2>
                </div>
              </Link>
            </div>

            <nav className="flex-1 p-6 space-y-8">
              
              {/* RUANG KEDUA: PORTOFOLIO PROYEK */}
              <div>
                <h3 className="px-4 text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">
                  Rekam Jejak Proyek
                </h3>
                <Link 
                  href="/portofolio" 
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl mb-2 border border-white/10 hover:bg-white/20 transition-all"
                >
                  <span className="text-white font-bold text-[10px] tracking-widest uppercase">📂 Semua Proyek</span>
                </Link>
                
                <div className="space-y-1 ml-4 border-l border-white/10">
                  {portfolioYears.map((year) => (
                    <Link
                      key={`port-${year}`}
                      href={`/portofolio/year/${year}`}
                      className="block p-3 text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-r-xl transition-all"
                    >
                      • Tahun {year}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Garis Pembatas Antar Ruang */}
              <div className="h-px bg-white/10 mx-4"></div>

              {/* RUANG PERTAMA: PUBLIKASI ILMIAH */}
              <div>
                <h3 className="px-4 text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">
                  Koleksi Jurnal
                </h3>
                <div className="space-y-1">
                  {journalYears.map((year) => (
                    <Link
                      key={`jour-${year}`}
                      href={`/year/${year}`}
                      className="flex items-center justify-between p-4 rounded-xl text-white/70 hover:bg-white/10 hover:text-white font-bold text-xs transition-all group"
                    >
                      <span>Tahun {year}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-5px] group-hover:translate-x-0">→</span>
                    </Link>
                  ))}
                </div>
              </div>

            </nav>

            {/* Footer Sidebar */}
            <div className="p-6 border-t border-white/10">
              <Link 
                href="/admin" 
                className="flex items-center gap-3 p-4 bg-black/20 rounded-2xl text-white/60 hover:text-white hover:bg-black/30 transition-all border border-white/5"
              >
                <span className="text-sm">🔑</span>
                <span className="text-[9px] font-black uppercase tracking-widest">Admin Area</span>
              </Link>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
