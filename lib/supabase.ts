import { createClient } from '@supabase/supabase-js';

// Mengambil kunci akses dari Environment Variables Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Inisialisasi Client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
