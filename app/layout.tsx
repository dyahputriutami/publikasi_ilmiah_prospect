"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // State untuk mengontrol buka-tutup (accordion) list tahun
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showJournal, setShowJournal] = useState(false);

  // Daftar tahun untuk masing-masing kategori
  const portfolioYears = [2026, 2025, 2024];
  const journalYears = [2026, 2025, 2024, 2023, 2022, 2021];

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          
          {/* SIDEBAR - GRADIENT LOCKED */}
          <aside className="w-80 bg-gradient-to-b from-[#039347] via-[#039347] to-[#003193] flex flex-col h-screen sticky top-0 overflow-hidden shadow-2xl z-50 border-r border-white/10">
            
            {/* BRANDING SECTION - MINIMALIST LOGO */}
            <div className="p-10">
              <Link href="/" className="group">
                <div className="bg-white/15 p-8 rounded-[2.5rem] backdrop-blur-md border border-white/20 shadow-inner text-center group-hover:bg-white/20 transition-all duration-500">
                  <h2 className="text-3xl font-black text-white tracking-[0.1em] leading-none">
                    PROSPECT
                  </h2>
                </div>
              </Link>
            </div>

            {/* NAVIGATION AREA */}
            <nav className="flex-1 px-8 space-y-6 overflow-y-auto no-scrollbar pb-10">
              
              {/* JUDUL SIDEBAR */}
              <div className="px-2 mb-4">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                  Database Prospect Institute
                </p>
              </div>

              {/* MENU 1: REKAM JEJAK PROYEK (PORTOFOLIO) */}
              <div className="space-y-2">
                <button 
                  onClick={() => setShowPortfolio(!showPortfolio)}
                  className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📂</span>
                    <span className="text-white font-black text-[10px] tracking-widest uppercase text-left">
                      Rekam Jejak Proyek
                    </span>
                  </div>
                  <span className={`text-white/50 text-[10px] transition-transform duration-300 ${showPortfolio ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {/* LIST TAHUN PORTOFOLIO (ACCORDION) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showPortfolio ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-1 gap-1 ml-4 border-l border-white/10 mt-2">
                    <Link href="/portofolio" className="block py-2 px-5 text-[9px] font-black text-white/40 hover:text-white uppercase tracking-widest italic">
                      Lihat Semua Proyek
                    </Link>
                    {portfolioYears.map((year) => (
                      <Link
                        key={`port-${year}`}
                        href={`/portofolio/year/${year}`}
                        className="block py-2.5 px-5 text-[11px] font-bold text-white/70 hover:text-white hover:translate-x-1 transition-all"
                      >
                        Tahun {year}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* MENU 2: KOLEKSI JURNAL (PUBLIKASI) */}
              <div className="space-y-2">
                <button 
                  onClick={() => setShowJournal(!showJournal)}
                  className="w-full flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📚</span>
                    <span className="text-white font-black text-[10px] tracking-widest uppercase text-left">
                      Koleksi Jurnal
                    </span>
                  </div>
                  <span className={`text-white/50 text-[10px] transition-transform duration-300 ${showJournal ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {/* LIST TAHUN JURNAL (ACCORDION) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showJournal ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-1 ml-4 border-l border-white/10 mt-2">
                    {journalYears.map((year) => (
                      <Link
                        key={`jour-${year}`}
                        href={`/year/${year}`}
                        className="flex items-center justify-between p-4 rounded-xl text-white/70 hover:bg-white/10 hover:text-white font-bold text-[11px] transition-all group"
                      >
                        <span>Tahun {year}</span>
                        <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                          VIEW →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </nav>

            {/* ADMIN FOOTER */}
            <div className="p-8">
              <Link 
                href="/admin" 
                className="flex items-center justify-center gap-3 py-5 bg-black/20 rounded-[1.5rem] text-white/50 hover:text-white hover:bg-black/40 transition-all border border-white/5 backdrop-blur-sm"
              >
                <span className="text-xs">🔑</span>
                <span className="text-[9px] font-black uppercase tracking-[0.25em]">Admin Area</span>
              </Link>
            </div>

          </aside>

          {/* CONTENT AREA */}
          <main className="flex-1 relative overflow-y-auto h-screen bg-slate-50">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
