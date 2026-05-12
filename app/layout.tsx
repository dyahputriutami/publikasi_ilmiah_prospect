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
  // Daftar tahun untuk sidebar - sesuaikan jika ada penambahan tahun
  const years = [2026, 2025, 2024, 2023, 2022, 2021];

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          
          {/* SIDEBAR FIXED */}
          <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 overflow-y-auto">
            
            {/* Header Sidebar / Logo */}
            <div className="p-8 border-b border-slate-50">
              <Link href="/" className="block">
                <h2 className="text-xl font-black text-[#003193] tracking-tighter leading-none">
                  PROSPECT<br/><span className="text-[#039347] text-xs tracking-[0.3em] uppercase">Institute</span>
                </h2>
              </Link>
            </div>

            {/* Navigasi Utama */}
            <nav className="flex-1 p-6 space-y-8">
              
              {/* Bagian Portofolio (Menu Baru) */}
              <div>
                <h3 className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                  Layanan & Rekam Jejak
                </h3>
                <Link 
                  href="/portofolio" 
                  className="flex items-center gap-4 p-4 rounded-[1.5rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className="w-10 h-10 bg-[#039347]/10 rounded-xl flex items-center justify-center text-[#039347] group-hover:bg-[#039347] group-hover:text-white transition-all">
                    💼
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-[#003193] uppercase tracking-widest">
                      Portofolio
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">
                      Proyek & Dokumen
                    </span>
                  </div>
                </Link>
              </div>

              {/* Bagian Jurnal Ilmiah */}
              <div>
                <h3 className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                  Koleksi Jurnal
                </h3>
                <div className="space-y-1">
                  {years.map((year) => (
                    <Link
                      key={year}
                      href={`/year/${year}`}
                      className="flex items-center justify-between p-4 rounded-[1.2rem] text-slate-600 hover:bg-slate-50 hover:text-[#003193] font-bold text-xs transition-all group"
                    >
                      <span>Tahun {year}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#039347]">→</span>
                    </Link>
                  ))}
                </div>
              </div>

            </nav>

            {/* Footer Sidebar / Admin Area */}
            <div className="p-6 border-t border-slate-50">
              <Link 
                href="/admin" 
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#003193] transition-colors"
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
