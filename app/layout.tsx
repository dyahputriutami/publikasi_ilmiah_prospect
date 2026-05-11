import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

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
          
          {/* SIDEBAR DENGAN GRADASI IDENTITAS */}
          <aside className="w-72 bg-gradient-to-b from-prospect-green to-prospect-blue text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl z-20">
            
            <div className="p-8 border-b border-white/10">
              {/* LOGO PROSPECT INSTITUTE */}
              <div className="mb-4 bg-white/10 p-3 rounded-2xl backdrop-blur-sm inline-block">
                <Image 
                  src="/logo-prospect.png" 
                  alt="Prospect Institute Logo" 
                  width={150} 
                  height={50} 
                  className="object-contain"
                />
              </div>
              
              <h1 className="text-xl font-black tracking-tight leading-tight uppercase">
                Publikasi Ilmiah<br />Prospect
              </h1>
            </div>
            
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              <Link href="/" className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-all font-medium group">
                <span className="mr-3 text-lg opacity-70 group-hover:opacity-100">🏠</span> Beranda
              </Link>
              
              <div className="pt-6 pb-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] px-3">
                Koleksi Tahun
              </div>
              
              {['2026', '2025', '2024', '2023'].map((year) => (
                <Link key={year} href={`/year/${year}`} className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-all font-medium group">
                  <span className="mr-3 text-lg opacity-70 group-hover:opacity-100">📁</span> Koleksi {year}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-white/10 bg-black/10">
              <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors block text-center">
                Admin Area
              </Link>
            </div>
          </aside>

          {/* AREA KONTEN UTAMA */}
          <main className="flex-1 relative">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  )
}
