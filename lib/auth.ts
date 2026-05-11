// lib/auth.ts

export const checkIsAdmin = () => {
  if (typeof document === 'undefined') return false;
  // Memeriksa apakah ada cookie admin yang aktif
  return document.cookie.split('; ').some(row => row.startsWith('prospect_admin_session=true'));
};

export const loginAdmin = (code: string) => {
  // Verifikasi kode langsung dari Environment Variable
  if (code === process.env.NEXT_PUBLIC_ADMIN_CODE) {
    document.cookie = "prospect_admin_session=true; path=/; SameSite=Strict";
    return true;
  }
  return false;
};
