// Di dalam app/layout.tsx, tambahkan array tahun untuk portofolio
const portfolioYears = [2026, 2025, 2024]; 
const journalYears = [2026, 2025, 2024, 2023, 2022, 2021];

// ... di dalam return sidebar ...

{/* RUANG KEDUA: PORTOFOLIO */}
<div>
  <h3 className="px-4 text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">
    Rekam Jejak Proyek
  </h3>
  <Link href="/portofolio" className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl mb-2 border border-white/10">
    <span className="text-white font-bold text-xs">📂 SEMUA PROYEK</span>
  </Link>
  
  {/* List Tahun Khusus Portofolio */}
  <div className="space-y-1 ml-4 border-l border-white/10">
    {portfolioYears.map((year) => (
      <Link
        key={year}
        href={`/portofolio/year/${year}`}
        className="block p-3 text-[11px] font-bold text-white/70 hover:text-white hover:bg-white/5 rounded-r-xl transition-all"
      >
        • Tahun {year}
      </Link>
    ))}
  </div>
</div>

<div className="h-px bg-white/10 my-6"></div>

{/* RUANG PERTAMA: PUBLIKASI (EXISTING) */}
<div>
  <h3 className="px-4 text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">
    Koleksi Jurnal
  </h3>
  {/* Render journalYears seperti biasa... */}
</div>
