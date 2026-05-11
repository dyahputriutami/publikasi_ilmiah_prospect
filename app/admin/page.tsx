"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../lib/auth';

export default function AdminPage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(code)) {
      router.push('/'); // Lempar ke beranda setelah sukses
      router.refresh();
    } else {
      alert("Kode Salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleEntry} className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 w-full max-w-sm text-center">
        <h2 className="text-[#003193] font-black uppercase text-xs tracking-[0.3em] mb-6">Akses Manajemen</h2>
        <input 
          type="password" 
          placeholder="Masukkan Kode"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4 text-center font-bold outline-none focus:border-[#039347]"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button type="submit" className="w-full bg-[#003193] text-white py-4 rounded-2xl font-bold hover:bg-[#039347] transition-all uppercase text-[10px] tracking-widest">
          Buka Fitur Admin
        </button>
      </form>
    </div>
  );
}
