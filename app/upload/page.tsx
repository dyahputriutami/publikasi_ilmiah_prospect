'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UploadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    journal_name: '',
    abstract: '',
    pdf_url: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('publikasi_ilmiah')
        .insert([formData])

      if (error) throw error

      alert('Publikasi berhasil disimpan!')
      router.push('/')
      router.refresh()
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-12 flex items-center justify-between">
          <div>
            <Link href="/" className="text-red-900 font-bold text-sm hover:underline mb-4 block">
              ← Kembali ke Beranda
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
              Unggah Publikasi
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Judul Artikel / Paper</label>
            <input
              required
              type="text"
              placeholder="Contoh: Analisis Kebijakan Publik..."
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-900 focus:bg-white transition-all outline-none"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Penulis</label>
              <input
                required
                type="text"
                placeholder="Nama Penulis (pisahkan dengan koma)"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-900 focus:bg-white transition-all outline-none"
                onChange={(e) => setFormData({...formData, authors: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tahun Publikasi</label>
              <input
                required
                type="number"
                defaultValue={new Date().getFullYear()}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-900 focus:bg-white transition-all outline-none"
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Jurnal / Prosiding</label>
            <input
              type="text"
              placeholder="Masukkan nama jurnal atau penerbit"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-900 focus:bg-white transition-all outline-none"
              onChange={(e) => setFormData({...formData, journal_name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Abstrak Singkat</label>
            <textarea
              rows={4}
              placeholder="Tuliskan ringkasan singkat artikel..."
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-900 focus:bg-white transition-all outline-none resize-none"
              onChange={(e) => setFormData({...formData, abstract: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tautan PDF (Google Drive/Dropbox)</label>
            <input
              required
              type="url"
              placeholder="https://link-file-anda.com"
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-red-900 focus:bg-white transition-all outline-none"
              onChange={(e) => setFormData({...formData, pdf_url: e.target.value})}
            />
            <p className="text-[10px] text-slate-400 mt-2">*Pastikan akses file sudah diatur menjadi 'Public'</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-red-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-950 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Publikasi'}
          </button>
        </form>
      </div>
    </div>
  )
}
