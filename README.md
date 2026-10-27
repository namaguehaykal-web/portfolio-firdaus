# Portofolio Pribadi Full-Stack — Muhammad Firdaus Haykal
**Solopreneur / Graphic Designer / Media Event Director**  
*Tema: Dark Mode Elegan Agency Media Kreatif dengan Aksen Purple Neon*

Website portofolio ini dirancang khusus untuk mempresentasikan profil, karya, dan reputasi profesional **Muhammad Firdaus Haykal** dengan standar estetika agensi media kreatif modern. Dibangun menggunakan arsitektur **React**, **Tailwind CSS**, dan backend server **Node.js** dengan pendekatan **Instant Progressive Rendering** yang 100% bebas error layar kosong (*blank screen*).

---

## 🌟 Fitur & Keunggulan Utama

1. **Instant Progressive Rendering (Zero Blank Screen)**:
   - Konten HTML, navigasi, visual hero, kartu profil agensi, dan studi kasus proyek utama sudah terpasang langsung di dalam dokumen (*first-paint ready*).
   - Menggunakan JavaScript modern murni tanpa ketergantungan compiler Babel runtime eksternal yang lambat, sehingga langsung berjalan saat berkas dibuka langsung di browser (`file://`) maupun via server (`http://localhost:3000`).

2. **Desain Agency Dark Mode & Purple Neon**:
   - Latar belakang obsidian halus (`#07070d`) dengan ambient glow dan cyber-grid khas visual media modern.
   - Aksen Purple Neon (`#a855f7`, `#c084fc`) dengan efek pendar (*glow effect*) dan kartu *glassmorphism* bergradasi.

3. **Dukungan Dua Bahasa (Bilingual: ID / EN)**:
   - Tombol toggle switch bahasa di Navbar (Indonesia / English) yang langsung mengubah seluruh teks secara dinamis tanpa me-refresh halaman.

4. **Struktur Halaman & Navigasi**:
   - **Navbar (Sticky)**: Monogram logo "FH", tautan navigasi responsif, switch bahasa, dan tombol CTA konsultasi cepat.
   - **Hero Section**: 
     - Badge status berdenyut: *"Terbuka untuk proyek & kolaborasi"*
     - Tagline: *"Solopreneur / Graphic Designer / Media Event Director"*
     - Statistik ringkas: 25+ Mitra Dipercaya | 400+ Produksi Kreatif Selesai | 3+ Tahun Pengalaman | 15+ Event Media Diarahkan.
     - Kartu Profil Agensi: Lokasi (Madiun - Yogyakarta), Status (Live: Firdaus Media), dan tautan cepat.
   - **Tentang Saya (About)**: Narasi perjalanan kreatif, sinergi keilmuan Ekonomi Syariah & Desain Visual, serta 5 minat utama (Media Event, UMKM Digital, UI/UX, Social Media Management, Digital Marketing).
   - **Pengalaman & Prestasi (Experience)**:
     - *Pendidikan*: SMKN 2 Madiun (Multimedia, JAC Magazine, OSIS, Panglima Printing) & STEI Hamfara Yogyakarta (Ekonomi Syariah, BEM, KSEI Relife, B-MELT 2025, GEO 2025).
     - *Riwayat Pekerjaan & Inisiatif*: Vanguard Creative Media, Firdaus Media, ZISWAH Hamfara, Creativeln.Co Madiun, Creative UX Jakarta.
     - *Prestasi*: Juara 1 Desain Poster Nasional Ekonomi Syariah UIN Bandung (2025) & Juara 1 LKS Desain Grafis Kota Madiun (2023).
   - **Proyek (Projects)**:
     - **Flagship Project**: *Aplikasi Manajemen Bengkel Mobil & Otomasi WhatsApp* (arsitektur alur kerja otomasi notifikasi servis, estimasi biaya, reminder ganti oli berkala, invoice digital).
     - Filter kategori interaktif (Semua, Web App & Otomasi, Branding & Identitas, Desain Grafis, Media Event).
     - Modal Popup Studi Kasus lengkap untuk setiap proyek terpilih.
   - **Keahlian & Toolkit (Skills)**:
     - 5 Pilar Kompetensi dengan visual progress bar.
     - Grid software profesional: Photoshop, Illustrator, Premiere Pro, After Effects, Figma, CorelDRAW, React, Tailwind CSS, WhatsApp Automation, OBS Studio.
   - **Kontak & Footer**:
     - Tombol cepat WhatsApp direct chat (`+62 822-3007-6610`) dengan pesan pembuka otomatis.
     - Email resmi (`namaguehaykal@gmail.com`).
     - Formulir kontak interaktif yang terhubung ke backend server (`/api/contact`) dan sekaligus menyediakan redirect 1-klik ke WhatsApp.

---

## 📁 Struktur Berkas Proyek

```
firdaus-portfolio/
├── data/
│   ├── portfolio-data.json      # Database data profil, proyek, dan pengalaman
│   └── messages.json            # Penyimpanan pesan masuk dari formulir kontak
├── public/
│   ├── index.html               # Halaman utama aplikasi React & Tailwind CSS
│   ├── styles.css               # Styling kustom Purple Neon, glow & glassmorphism
│   ├── data.js                  # Data lokal & bilingual fallback (100% offline-ready)
│   └── app.js                   # Kontroler interaktif JavaScript murni
├── package.json                 # Metadata proyek
├── server.js                    # Backend HTTP REST API & static server Node.js
├── start.bat                    # Script 1-klik peluncur Windows
├── start.ps1                    # Script peluncur PowerShell
└── README.md                    # Dokumentasi lengkap
```

---

## 🚀 Cara Menjalankan Portofolio

### Cara 1: Buka Langsung di Web Browser (Paling Praktis)
Cukup klik ganda berkas:
[`public/index.html`](file:///C:/Users/Asus/.gemini/antigravity/scratch/firdaus-portfolio/public/index.html)
Website langsung tampil seketika dengan animasi Purple Neon, beralih bahasa, filter portofolio, dan generator WhatsApp.

### Cara 2: Menggunakan Script Peluncur 1-Klik (Windows)
Klik ganda berkas [`start.bat`](file:///C:/Users/Asus/.gemini/antigravity/scratch/firdaus-portfolio/start.bat) atau jalankan melalui PowerShell:
```powershell
cd C:\Users\Asus\.gemini\antigravity\scratch\firdaus-portfolio
.\start.ps1
```
Script akan otomatis menjalankan server REST API lokal di port 3000 dan membuka `http://localhost:3000`.

---
© 2026 Muhammad Firdaus Haykal. Firdaus Media Studio.
