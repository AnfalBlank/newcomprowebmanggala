# Panduan Upload Logo Partner Perusahaan

## 📁 Lokasi Penyimpanan
Simpan semua logo partner di folder: `public/partners/`

## 📝 Format Nama File (WAJIB)

Gunakan format nama file berikut untuk konsistensi:

### Format Dasar:
```
[nama-perusahaan]-partner.[extensi]
```

### Contoh Format Nama File:
```
pertamina-partner.png
shell-partner.jpg
bp-partner.webp
total-partner.png
exxonmobil-partner.jpg
petronas-partner.png
```

### Aturan Penamaan:
1. ✅ **Huruf kecil semua** (lowercase)
2. ✅ **Gunakan tanda strip** (-) untuk spasi
3. ✅ **Hanya huruf dan angka** (a-z, 0-9)
4. ✅ **Akhiran `-partner`** wajib ada
5. ✅ **Ekstensi file**: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`

### Contoh yang BENAR ✅:
- `pertamina-partner.png`
- `shell-indonesia-partner.jpg`
- `bp-ep-partner.webp`
- `total-energi-partner.png`

### Contoh yang SALAH ❌:
- `Pertamina.png` (huruf besar)
- `Shell Partner.jpg` (ada spasi)
- `BP_EP.png` (ada underscore)
- `logo-pertamina-baru.png` (tidak ada akhiran -partner)

## 🖼️ Spesifikasi Gambar

### Ukuran yang Disarankan:
- **Minimum**: 200x200 pixel
- **Ideal**: 400x400 pixel (kotak)
- **Maksimal**: 800x800 pixel

### Format File:
- **PNG** (disarankan untuk background transparan)
- **JPG/JPEG** (untuk foto dengan background solid)
- **WebP** (format modern, ukuran lebih kecil)
- **SVG** (untuk logo vektor, ukuran fleksibel)

### Tips Kualitas:
- Gunakan background transparan (PNG) untuk hasil terbaik
- Pastikan logo terlihat jelas di background putih atau abu-abu muda
- Hindari kompresi berlebihan
- Pastikan rasio aspek tetap kotak (1:1)
- Untuk frameless design, pastikan logo tidak terlalu kompleks

## 📋 Cara Menggunakan di Website

### Method 1: Langsung di Komponen

```tsx
import { PartnerLogos } from "@/components/partner-logos"

const partners = [
  { name: "Pertamina", logo: "/partners/pertamina-partner.png" },
  { name: "Shell", logo: "/partners/shell-partner.png" },
  { name: "BP", logo: "/partners/bp-partner.png" },
]

<PartnerLogos
  partners={partners}
  title="Perusahaan yang Percaya pada Kami"
  subtitle="Kami bangga bekerja sama dengan berbagai perusahaan ternama"
/>
```

### Method 2: Dinamis dari Database

Tambahkan field logo di database dan fetch secara dinamis:

```tsx
// Di API route
const partners = await db.select().from(partners)

// Di komponen
<PartnerLogos partners={partners} />
```

## 🎨 Contoh Implementasi

### Di Halaman About (Grid Layout):
```tsx
import { PartnerLogos } from "@/components/partner-logos"

const ourPartners = [
  { name: "Pertamina", logo: "/partners/pertamina-partner.png" },
  { name: "Shell Indonesia", logo: "/partners/shell-partner.png" },
  { name: "BP Indonesia", logo: "/partners/bp-partner.png" },
  { name: "Total Energies", logo: "/partners/total-partner.png" },
]

<PartnerLogos
  partners={ourPartners}
  title="Perusahaan yang Percaya pada Kami"
  subtitle="Kami bangga bekerja sama dengan berbagai perusahaan ternama di Indonesia"
/>
```

### Di Halaman Utama (Infinite Scroll):
```tsx
import { InfinitePartnerLogos } from "@/components/partner-logos"

const featuredPartners = [
  { name: "Pertamina", logo: "/partners/pertamina-partner.png" },
  { name: "Shell", logo: "/partners/shell-partner.png" },
]

<InfinitePartnerLogos partners={featuredPartners} />
```

## ⚡ Fitur Animasi

Komponen `PartnerLogos` (Grid Layout):
- ✅ **Fade in animation** saat scroll ke view
- ✅ **Hover effect** (scale 1.05)
- ✅ **Stagger animation** untuk masing-masing logo
- ✅ **Responsive grid** (2 kolom mobile, 4 tablet, 6 desktop)
- ✅ **Frameless design** - clean tanpa border/shadow

Komponen `InfinitePartnerLogos` (Scrolling):
- ✅ **Auto-scroll animation** yang terus bergerak
- ✅ **Infinite loop** seamless
- ✅ **Gradient fade** di kiri dan kanan
- ✅ **Pause on hover** untuk better UX
- ✅ **Frameless design** - minimalis dan clean

## 🎯 Frameless Design

Kedua komponen menggunakan **frameless design** yang clean:
- ❌ Tidak ada border/frame
- ❌ Tidak ada shadow
- ✅ Logo murni tanpa gangguan visual
- ✅ Hover effect halus (scale 1.05 / 1.1)
- ✅ Fokus pada logo itu sendiri

## 🔧 Troubleshooting

### Logo tidak muncul?
1. Pastikan file ada di folder `public/partners/`
2. Cek nama file sesuai format (huruf kecil, strip, -partner)
3. Pastikan ekstensi file benar

### Animasi tidak jalan?
1. Komponen menggunakan Framer Motion - pastikan sudah terinstall
2. Cek console untuk error JavaScript

### Logo terlihat buram atau kurang tajam?
1. Gunakan ukuran minimal 400x400px
2. Gunakan format PNG atau WebP untuk kualitas terbaik
3. Hindari kompresi berlebihan
4. Pastikan background transparan untuk hasil optimal

### Logo terlihat terlalu kecil/besar?
1. Gunakan ukuran 400x400px untuk konsistensi
2. Pastikan rasio aspek kotak (1:1)
3. Komponen akan menyesuaikan ukuran secara responsif

## 📞 Butuh Bantuan?

Jika ada masalah dengan upload logo partner:
1. Cek kembali format nama file
2. Pastikan file tersimpan di folder yang benar
3. Hubungi developer untuk troubleshooting

---

**Catatan**: Setiap kali Anda menambahkan logo partner baru, pastikan:
- Format nama file sesuai ketentuan
- Ukuran gambar optimal (400x400px recommended)
- Logo terlihat jelas dan profesional
- Background transparan untuk hasil terbaik
- File tidak terlalu besar (<500KB disarankan)

