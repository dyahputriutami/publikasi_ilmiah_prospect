import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arsip Publikasi | Prospect Institute",
  description: "Pusat Data dan Publikasi Ilmiah Prospect Institute",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const years = [2026, 2025, 2024, 2023, 2022, 2021];

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          
          {/* SIDEBAR DENGAN GRADASI WARNA PROSPECT */}
          <aside className="w-72 bg-gradient-to-b from-[#039347] to-[#003193] flex flex-col h-screen sticky top-0 overflow-y-auto shadow-xl">
            
            {/* Header Sidebar / Logo */}
            <div className="p-8 border-b border-white/10">
              <Link href="/" className="block">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
                  <h2 className="text-xl font-black text-white tracking-tighter leading-none">
                    PROSPECT<br/><span className="text-white/70 text-[10px] tracking-[0.3em] uppercase font-bold">Institute</span>
                  </h2>
                </div>
              </Link>
            </div>

            {/* Navigasi Utama */}
            <nav className="flex-1 p-6 space-y-8">
              
              {/* Bagian Portofolio */}
              <div>
                <h3 className="px-4 text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">
                  Layanan & Rekam Jejak
                </h3>
                <Link 
                  href="/portofolio" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white transition-all group-hover:scale-110">
                    💼
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                      Portofolio
                    </span>
                    <span className="text-[8px] font-bold text-white/60 uppercase">
                      Proyek & Dokumen
                    </span>
                  </div>
                </Link>
              </div>

              {/* Bagian Jurnal Ilmiah */}
              <div>
                <h3 className="px-4 text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">
                  Koleksi Jurnal
                </h3>
                <div className="space-y-1">
                  {years.map((year) => (
                    <Link
                      key={year}
                      href={`/year/${year}`}
                      className="flex items-center justify-between p-4 rounded-xl text-white/80 hover:bg-white/10 hover:text-white font-bold text-xs transition-all group"
                    >
                      <span>Tahun {year}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">→</span>
                    </Link>
                  ))}
                </div>
              </div>

            </nav>

            {/* Footer Sidebar / Admin Area */}
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
          <div className="flex-1 overflow-x-hidden">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
