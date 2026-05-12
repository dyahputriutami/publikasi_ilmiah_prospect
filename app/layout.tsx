"use client"; // Wajib ditambahkan untuk fungsi klik (useState)

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // State untuk mengontrol buka-tutup list tahun
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showJournal, setShowJournal] = useState(false);

  const portfolioYears = [2026, 2025, 2024];
  const journalYears = [2026, 2025, 2024, 2023, 2022, 2021];

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          
          {/* SIDEBAR */}
          <aside className="w-80 bg-gradient-to-b from-[#039347] via-[#039347] to-[#003193] flex flex-col h-screen sticky top-0 overflow-hidden shadow-2xl z-50 border-r border-white/10">
            
            {/* BRANDING SECTION */}
            <div className="p-10">
              <Link href="/" className="group">
                <div className="bg-white/15 p-6 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-inner text-center">
                  <h2 className="text-2xl font-black text-white tracking-tighter leading-none">PROSPECT</h2>
                  <div className="h-px w-8 bg-white/30 mx-auto my-2"></div>
                  <p className="text-white/80 text-[9px] tracking-[0.4em] uppercase font-bold">Institute</p>
                </div>
              </Link>
            </div>

            {/* NAVIGATION AREA */}
            <nav className="flex-1 px-8 space-y-4 overflow-y-auto no-scrollbar pb-10">
              
              {/* RUANG 2: PORTOFOLIO PROYEK */}
              <div className="space-y-2">
                <button 
                  onClick={() => setShowPortfolio(!showPortfolio)}
                  className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📂</span>
                    <span className="text-white font-black text-[10px] tracking-widest uppercase text-left">Rekam Jejak Proyek</span>
                  </div>
                  <span className={`text-white/50 text-xs transition-transform duration-300 ${showPortfolio ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {/* LIST TAHUN PORTOFOLIO (HIDDEN BY DEFAULT) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showPortfolio ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-1 gap-1 ml-4 border-l border-white/10 mt-2">
                    <Link href="/portofolio" className="block py-2 px-5 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest italic">
                      Lihat Semua
                    </Link>
                    {portfolioYears.map((year) => (
                      <Link
                        key={`port-${year}`}
                        href={`/portofolio/year/${year}`}
                        className="block py-2.5 px-5 text-[11px] font-bold text-white/60 hover:text-white hover:translate-x-1 transition-all"
                      >
                        Tahun {year}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* RUANG 1: PUBLIKASI ILMIAH */}
              <div className="space-y-2 pt-4">
                <button 
                  onClick={() => setShowJournal(!showJournal)}
                  className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📚</span>
                    <span className="text-white font-black text-[10px] tracking-widest uppercase text-left">Koleksi Jurnal</span>
                  </div>
                  <span className={`text-white/50 text-xs transition-transform duration-300 ${showJournal ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {/* LIST TAHUN JURNAL (HIDDEN BY DEFAULT) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showJournal ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-1 ml-4 border-l border-white/10 mt-2">
                    {journalYears.map((year) => (
                      <Link
                        key={`jour-${year}`}
                        href={`/year/${year}`}
                        className="flex items-center justify-between p-4 rounded-xl text-white/70 hover:bg-white/10 hover:text-white font-bold text-[11px] transition-all"
                      >
                        <span>Tahun {year}</span>
                        <span className="text-[10px] opacity-40">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </nav>

            {/* ADMIN ACCESS FOOTER */}
            <div className="p-8">
              <Link 
                href="/admin" 
                className="flex items-center justify-center gap-3 py-5 bg-black/20 rounded-[1.5rem] text-white/50 hover:text-white hover:bg-black/40 transition-all border border-white/5"
              >
                <span className="text-xs">🔑</span>
                <span className="text-[9px] font-black uppercase tracking-[0.25em]">Admin Area</span>
              </Link>
            </div>
          </aside>

          {/* MAIN VIEWPORT */}
          <main className="flex-1 relative overflow-y-auto h-screen bg-slate-50">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
