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
      <body className={`${inter.className} bg-stone-50 text-slate-900 antialiased`}>
        <div className="flex min-h-screen">
          
          {/* SIDEBAR MAROON */}
          <aside className="w-72 bg-red-900 text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl">
            <div className="p-8 border-b border-red-800">
              <h1 className="text-xl font-black tracking-tight leading-tight">
                Publikasi Ilmiah<br />Prospect
              </h1>
              <div className="mt-2 h-1 w-12 bg-white rounded-full"></div>
            </div>
            
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              <Link href="/" className="flex items-center p-3 rounded-xl hover:bg-red-800 transition-all font-medium">
                <span className="mr-3">🏠</span> Beranda
              </Link>
              
              <div className="pt-6 pb-2 text-[10px] font-bold text-red-300 uppercase tracking-[0.2em] px-3">
                Koleksi Tahun
              </div>
              
              {['2026', '2025', '2024', '2023'].map((year) => (
                <Link key={year} href={`/year/${year}`} className="flex items-center p-3 rounded-xl hover:bg-red-800 transition-all font-medium">
                  <span className="mr-3">📁</span> Koleksi {year}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-red-800">
              <Link href="/upload" className="flex items-center justify-center w-full py-4 bg-white text-red-900 rounded-2xl font-bold hover:bg-red-50 transition-all shadow-lg active:scale-95">
                + Unggah Paper
              </Link>
            </div>
          </aside>

          {/* AREA KONTEN UTAMA */}
          <main className="flex-1 relative overflow-x-hidden">
            <div className="relative z-10">
              {children}
            </div>
          </main>
          
        </div>
      </body>
    </html>
  )
}
