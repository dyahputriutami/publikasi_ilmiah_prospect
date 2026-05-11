import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Publikasi Ilmiah Prospect',
  description: 'Sistem Arsip Publikasi Ilmiah dan Riset Prospect Institute',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <div className="flex min-h-screen">
          
          {/* SIDEBAR DENGAN IDENTITAS BARU (Royal Blue) */}
          <aside className="w-72 bg-prospect-blue text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl z-20">
            <div className="p-8 border-b border-prospect-blue-dark/50">
              <h1 className="text-xl font-black tracking-tight leading-tight">
                Publikasi Ilmiah<br />Prospect
              </h1>
              {/* Garis aksen hijau */}
              <div className="mt-2 h-1 w-12 bg-prospect-green rounded-full"></div>
            </div>
            
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              <Link href="/" className="flex items-center p-3 rounded-xl hover:bg-prospect-green transition-all font-medium group">
                <span className="mr-3 text-lg opacity-70 group-hover:opacity-100">🏠</span> Beranda
              </Link>
              
              <div className="pt-6 pb-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] px-3">
                Koleksi Tahun
              </div>
              
              {['2026', '2025', '2024', '2023'].map((year) => (
                <Link key={year} href={`/year/${year}`} className="flex items-center p-3 rounded-xl hover:bg-prospect-green/50 transition-all font-medium group">
                  <span className="mr-3 text-lg opacity-70 group-hover:opacity-100">📁</span> Koleksi {year}
                </Link>
              ))}
            </nav>

            {/* Bagian bawah sidebar */}
            <div className="p-6 border-t border-prospect-blue-dark/50 bg-prospect-blue-dark/30">
              {/* Link untuk login admin nanti */}
              <Link href="/admin" className="text-xs text-white/50 hover:text-white transition-colors block text-center mb-3">
                Admin Area
              </Link>
            </div>
          </aside>

          {/* AREA KONTEN UTAMA */}
          <main className="flex-1 relative overflow-x-hidden">
            {/* Latar belakang dekoratif gradasi halus */}
            <div className="absolute inset-0 bg-gradient-to-br from-prospect-green/5 to-prospect-blue/5 z-0"></div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
          
        </div>
      </body>
    </html>
  )
}
