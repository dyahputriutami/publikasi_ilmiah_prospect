/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mendaftarkan warna identitas Prospect
        prospect: {
          green: '#039347',
          blue: '#003193',
          'blue-dark': '#001A4F', // Warna navy lebih gelap untuk teks
        }
      },
      backgroundImage: {
        // Membuat gradasi dinamis untuk elemen UI
        'gradient-prospect': 'linear-gradient(to right, #039347, #003193)',
        'gradient-prospect-hover': 'linear-gradient(to right, #003193, #039347)',
        'gradient-prospect-card': 'linear-gradient(135deg, #039347 0%, #003193 100%)',
      }
    },
  },
  plugins: [],
}
