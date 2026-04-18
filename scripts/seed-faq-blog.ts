import { db } from "../server/db";
import { faqs, articles } from "../server/db/schema";
import { nanoid } from "nanoid";

async function seedFAQs() {
  console.log("Seeding FAQs...");

  const faqData = [
    // Kategori: General (Pertanyaan umum tentang perusahaan)
    {
      id: nanoid(),
      question: "Apa itu PT. Manggala Utama Indonesia?",
      answer: "PT. Manggala Utama Indonesia adalah perusahaan system integrator dan engineering solutions yang berfokus pada penyediaan solusi fueling system, infrastruktur jaringan, dan pengadaan IT berstandar enterprise. Kami telah berpengalaman melayani berbagai industri di Indonesia.",
      category: "general",
      order: 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Berapa lama pengalaman PT. Manggala Utama Indonesia?",
      answer: "Kami memiliki pengalaman bertahun-tahun dalam industri system integration dan engineering solutions, dengan portofolio proyek yang sukses di berbagai sektor industri di Indonesia.",
      category: "general",
      order: 2,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Siapa yang cocok menggunakan jasa PT. Manggala Utama Indonesia?",
      answer: "Kami melayani berbagai jenis industri yang membutuhkan solusi fueling system profesional, infrastruktur jaringan IT, dan pengadaan perangkat IT. Klien kami mencakup industri SPBU, transportasi logistik, manufaktur, dan berbagai perusahaan yang membutuhkan infrastruktur IT yang handal.",
      category: "general",
      order: 3,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Bagaimana cara memulai kerjasama dengan PT. Manggala Utama Indonesia?",
      answer: "Anda dapat menghubungi kami melalui form kontak di website, email ke admin@manggala-utama.id, atau WhatsApp ke +62 878-8424-1703. Tim kami akan dengan senang hati memberikan konsultasi gratis untuk kebutuhan Anda.",
      category: "general",
      order: 4,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Kategori: Products (Detail fitur, spesifikasi, produk)
    {
      id: nanoid(),
      question: "Apa saja produk fueling system yang tersedia?",
      answer: "Kami menyediakan berbagai produk fueling system antara lain: ATG (Automatic Tank Gauge) Gilbarco Veeder-Root, Fuel Pump dispenser, Flow meter, Sistem integrasi POS & MCU untuk SPBU, dan berbagai perangkat pendukung lainnya dari brand ternama.",
      category: "products",
      order: 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakah produk yang ditampilkan sudah lengkap dengan garansi?",
      answer: "Ya, semua produk yang kami sediakan dilengkapi dengan garansi resmi dari pabrik. Kami juga memberikan layanan after-sales support dan maintenance untuk memastikan operasional perangkat Anda berjalan lancar.",
      category: "products",
      order: 2,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apa perbedaan antara berbagai jenis ATG yang tersedia?",
      answer: "Kami menyediakan beberapa jenis ATG dengan fitur dan spesifikasi yang berbeda, disesuaikan dengan kebutuhan dan budget Anda. Setiap tipe memiliki keunggulan masing-masing dalam hal akurasi, kemudahan integrasi, dan fitur monitoring. Tim kami siap membantu Anda memilih yang paling sesuai.",
      category: "products",
      order: 3,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakahakah perangkat yang ditampilkan kompatibel dengan sistem yang sudah ada?",
      answer: "Sebagian besar produk kami kompatibel dengan berbagai sistem yang sudah ada. Namun, kami menyarankan untuk melakukan konsultasi terlebih dahulu agar tim kami dapat melakukan assessment dan memastikan kompatibilitas sistem Anda.",
      category: "products",
      order: 4,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Kategori: Services (Layanan & Solusi)
    {
      id: nanoid(),
      question: "Apa saja layanan yang ditawarkan PT. Manggala Utama Indonesia?",
      answer: "Kami menawarkan berbagai layanan meliputi: Instalasi dan konfigurasi Fueling & ATG System, Integrasi POS & MCU, Pembangunan infrastruktur jaringan, IT Procurement (pengadaan perangkat IT), serta layanan Maintenance & SLA untuk memastikan sistem Anda beroperasi secara optimal.",
      category: "services",
      order: 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Bagaimana proses implementasi sistem fueling management?",
      answer: "Proses implementasi kami meliputi: 1) Survey dan assessment lokasi, 2) Desain sistem yang disesuaikan dengan kebutuhan, 3) Instalasi perangkat dan konfigurasi sistem, 4) Training penggunaan untuk tim Anda, 5) Testing dan commissioning, 6) Handover dan ongoing support.",
      category: "services",
      order: 2,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Berapa lama waktu yang dibutuhkan untuk implementasi sistem?",
      answer: "Waktu implementasi bervariasi tergantung pada skala dan kompleksitas proyek. Untuk instalasi ATG standalone biasanya memakan waktu 3-5 hari kerja, sedangkan untuk integrasi sistem penuh mungkin memakan waktu 2-4 minggu. Kami memberikan timeline yang jelas di awal proyek.",
      category: "services",
      order: 3,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakah menyediakan layanan maintenance dan SLA?",
      answer: "Ya, kami menyediakan layanan Maintenance & SLA dengan berbagai paket yang dapat disesuaikan dengan kebutuhan Anda. Layanan ini mencakup preventive maintenance, corrective maintenance, remote monitoring, dan support 24/7 untuk critical system.",
      category: "services",
      order: 4,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Kategori: Technical (Pertanyaan teknis)
    {
      id: nanoid(),
      question: "Bagaimana cara kerja sistem monitoring ATG?",
      answer: "Sistem ATG kami bekerja dengan sensor presisi yang dipasang di tangki penyimpanan fuel. Data level, suhu, dan volume ditransmis secara real-time ke konsol monitoring atau cloud server. Anda dapat memantau stok fuel, mendeteksi kebocoran, dan generating laporan otomatis kapan saja.",
      category: "technical",
      order: 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakah sistem dapat diintegrasikan dengan software lain?",
      answer: "Ya, sistem kami didesain untuk integrasi yang mudah. Kami mendukung integrasi dengan berbagai software seperti ERP, accounting system, dan aplikasi manajemen bisnis lainnya melalui API atau database connection.",
      category: "technical",
      order: 2,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Bagaimana dengan keamanan data di sistem?",
      answer: "Kami menerapkan standar keamanan data yang tinggi dengan enkripsi data transmission, role-based access control, dan regular backup. Sistem kami juga mematuhi standar keamanan industri dan dapat disesuaikan dengan kebijakan keamanan perusahaan Anda.",
      category: "technical",
      order: 3,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakah menyediakan training untuk penggunaan sistem?",
      answer: "Ya, kami menyediakan training komprehensif untuk tim Anda, mencakup penggunaan sistem operasional, maintenance dasar, troubleshooting, dan optimalisasi fitur yang tersedia. Training dapat dilakukan onsite maupun online.",
      category: "technical",
      order: 4,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Kategori: Billing (Tagihan & Pembayaran)
    {
      id: nanoid(),
      question: "Bagaimana prosedur pembayaran dan penagihan?",
      answer: "Kami menyediakan berbagai opsi pembayaran yang fleksibel termasuk transfer bank, corporate payment, dan sesuai dengan ketentuan PO yang disepakati. Invoice akan diterbitkan sesuai dengan milestone proyek atau pengiriman barang.",
      category: "billing",
      order: 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakahakah menerima pembayaran tempo?",
      answer: "Ya, untuk klien korporat kami dapat menawarkan skema pembayaran tempo sesuai dengan ketentuan yang disepakati dalam kontrak atau PO. Detail syarat dan ketentuan dapat didiskusikan lebih lanjut dengan tim sales kami.",
      category: "billing",
      order: 2,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Apakah harga yang ditampilkan sudah termasuk PPN?",
      answer: "Harga yang kami tampilkan dapat berupa harga sebelum PPN atau sudah termasuk PPN, tergantung jenis penawaran. Kami akan selalu memberikan perincian harga yang transparan dan jelas dalam setiap penawaran yang kami berikan.",
      category: "billing",
      order: 3,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: nanoid(),
      question: "Bagaimana prosedur pengembalian barang atau klaim garansi?",
      answer: "Untuk klaim garansi, silakan hubungi tim support kami dengan menyertakan detail masalah dan bukti pembelian. Kami akan memproses klaim sesuai dengan ketentuan garansi masing-masing produk. Pengembalian barang diproses sesuai dengan syarat dan ketentuan yang berlaku.",
      category: "billing",
      order: 4,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  try {
    await db.insert(faqs).values(faqData);
    console.log("✅ FAQs seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding FAQs:", error);
  }
}

async function seedArticles() {
  console.log("Seeding Articles...");

  const articleData = [
    // Berita Perusahaan
    {
      id: nanoid(),
      title: "PT. Manggala Utama Indonesia: Solusi Fueling System Terintegrasi untuk Industri Indonesia",
      slug: "pt-manggala-utama-indonesia-solusi-fueling-system-terintegrasi",
      excerpt: "Mengenal lebih dekat peran PT. Manggala Utama Indonesia sebagai penyedia solusi fueling system dan IT integration terpercaya di Indonesia.",
      content: `# PT. Manggala Utama Indonesia: Mitra Terpercaya Solusi Fueling System

PT. Manggala Utama Indonesia hadir sebagai jawaban atas kebutuhan industri di Indonesia akan solusi **fueling system** yang terintegrasi dan handal. Sebagai perusahaan system integrator dengan pengalaman bertahun-tahun, kami berkomitmen untuk memberikan layanan terbaik dalam berbagai sektor.

## Layanan Utama Kami

Kami menawarkan berbagai layanan yang dirancang untuk meningkatkan efisiensi operasional bisnis Anda:

### 1. Fueling & ATG System
- **Automatic Tank Gauge (ATG)** dari brand ternama seperti Gilbarco Veeder-Root
- Sistem monitoring tangkiBBM secara real-time
- Deteksi kebocoran dan preventive maintenance
- Laporan otomatis dan analisis data

### 2. Integrasi POS & MCU
- Sistem Point of Sale terintegrasi untuk SPBU
- Mobile Control Unit untuk operasional yang efisien
- Integrasi dengan sistem pembayaran digital
- Cloud-based management dashboard

### 3. Network Infrastructure
- Perancangan dan instalasi jaringan enterprise
- Fiber optic deployment
- Network security solutions
- Maintenance dan monitoring 24/7

### 4. IT Procurement
- Pengadaan perangkat IT berkualitas
- Konsultasi kebutuhan infrastruktur IT
- Konfigurasi dan deployment
- Support dan maintenance

## Mengapa Memilih Kami?

- **Pengalaman**: Bertahun-tahun melayani berbagai industri di Indonesia
- **Teknologi Terkini**: Menggunakan produk dengan standar internasional
- **Tim Ahli**: Didukung oleh teknisi bersertifikasi
- **Layanan Purna Jual**: Support dan maintenance berkelanjutan

Hubungi kami hari ini untuk konsultasi gratis mengenai kebutuhan bisnis Anda!`,
      featuredImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop",
      category: "company_news",
      tags: JSON.stringify(["company", "about", "fueling system", "IT solutions"]),
      author: "PT. Manggala Utama Indonesia",
      publishedDate: new Date("2025-01-15"),
      active: true,
      featured: true,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Update Produk
    {
      id: nanoid(),
      title: "Gilbarco Veeder-Root ATG: Solusi Monitoring Tangki BBM Terdepan",
      slug: "gilbarco-veeder-root-atg-solusi-monitoring-tangki-bbm",
      excerpt: "Pelajari keunggulan ATG Gilbarco Veeder-Root untuk monitoring tangki BBM yang akurat dan terintegrasi.",
      content: `# Gilbarco Veeder-Root ATG: Monitoring Canggih untuk Tangki BBM Anda

Automatic Tank Gauge (ATG) dari **Gilbarco Veeder-Root** merupakan salah satu solusi paling canggih untuk monitoring tangki BBM di Indonesia. PT. Manggala Utama Indonesia sebagai authorized partner menyediakan instalasi dan support untuk produk ini.

## Keunggulan Utama

### 1. Akurasi Tinggi
- Sensor presisi tinggi untuk pengukuran level BBM
- Monitoring suhu dan density secara real-time
- Akurasi hingga ±1mm untuk level measurement

### 2. Integrasi Mudah
- Kompatibel dengan berbagai jenis dispenser
- API integration untuk sistem existing
- Cloud-based monitoring capability
- Mobile app untuk remote access

### 3. Fitur Advanced
- Leak detection system
- Inventory management otomatis
- Reorder notification
- Historical data dan trend analysis

### 4. Compliance & Safety
- Memenuhi standar keselamatan internasional
- Automatic alert untuk anomali
- Environmental monitoring
- Audit trail lengkap

## Implementasi

Proses implementasi ATG Gilbarco Veeder-Root bersama kami:

1. **Site Survey**: Assessment lokasi dan kebutuhan
2. **Design**: Custom system design sesuai requirement
3. **Installation**: Instalasi profesional oleh teknisi bersertifikasi
4. **Configuration**: Setup parameter dan integration
5. **Training**: Pelatihan untuk operator
6. **Support**: Ongoing maintenance dan technical support

## ROI dan Manfaat

Investasi pada ATG quality memberikan berbagai manfaat:
- Pengurangan loss BBM hingga 30%
- Peningkatan efisiensi operasional
- Real-time inventory management
- Preventive maintenance capability
- Compliance dengan regulasi

Hubungi kami untuk demo produk dan konsultasi gratis!`,
      featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      category: "product_updates",
      tags: JSON.stringify(["ATG", "Gilbarco", "fueling system", "monitoring"]),
      author: "Tim Technical",
      publishedDate: new Date("2025-01-10"),
      active: true,
      featured: true,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Technical
    {
      id: nanoid(),
      title: "Panduan Lengkap Integrasi POS & MCU untuk SPBU Modern",
      slug: "panduan-lengkap-integrasi-pos-mcu-spbu-modern",
      excerpt: "Pelajari cara integrasi sistem POS dan MCU untuk operasional SPBU yang lebih efisien dan modern.",
      content: `# Integrasi POS & MCU: Transformasi SPBU Modern

Sistem **Point of Sale (POS)** dan **Mobile Control Unit (MCU)** terintegrasi menjadi kunci operasional SPBU modern di era digital. PT. Manggala Utama Indonesia memberikan solusi komprehensif untuk transformasi digital SPBU Anda.

## Komponen Sistem

### 1. POS System
- **Transaction Processing**: Pembayaran cepat dan akurat
- **Multi-payment Support**: Cash, card, QR payment, e-wallet
- **Product Database**: Manajemen produk dan harga
- **Receipt Printing**: Struk otomatis dan custom
- **Shift Management**: Opening/closing shift cashier

### 2. Mobile Control Unit
- **Wireless Operation**: Kontrol tanpa kabel
- **Real-time Authorization**: Approve transaction dari dispenser
- **Pump Control**: Start/stop pump remotely
- **Price Display**: Update harga real-time
- **Battery Backup**: Operasional saat listrik padam

## Arsitektur Integrasi

Sistem kami menggunakan arsitektur modern dengan:

\`\`\`
┌─────────────────────────────────────┐
│        Cloud Server                 │
│  - Database & Analytics             │
│  - Monitoring Dashboard             │
│  - API Integration                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Local Server                 │
│  - POS Application                  │
│  - MCU Controller                   │
│  - Data Sync                        │
└──────┬───────────────────┬───────────┘
       │                   │
┌──────▼────────┐   ┌─────▼──────────┐
│  POS Terminals│   │  MCU Units     │
│  - Cashier    │   │  - Pump 1      │
│  - Manager    │   │  - Pump 2      │
└───────────────┘   │  - Pump N      │
                    └────────────────┘
\`\`\`

## Fitur Unggulan

### Real-time Synchronization
- Data transaction tersinkronisasi antar unit
- Update inventory otomatis
- Cloud backup untuk data security

### Advanced Analytics
- Sales report harian/bulanan
- Product performance analysis
- Customer behavior tracking
- Forecasting demand

### Security Features
- Role-based access control
- Transaction audit trail
- Fraud detection system
- Encrypted data transmission

## Implementasi

Kami menyediakan implementasi bertahap:

### Phase 1: Assessment
- Survey existing infrastructure
- Identify integration points
- Define requirements

### Phase 2: Installation
- Server setup dan configuration
- POS terminal installation
- MCU deployment
- Network setup

### Phase 3: Integration
- System integration testing
- Data migration
- API configuration

### Phase 4: Training
- Cashier training
- Manager training
- Technical training

### Phase 5: Go Live
- Parallel run
- Full deployment
- Ongoing support

## Best Practices

Tips untuk implementasi sukses:

1. **Planning Rinci**: Siapkan timeline dan scope yang jelas
2. **Stakeholder Buy-in**: Dapatkan dukungan semua pihak
3. **Training Komprehensif**: Pastikan semua user terlatih
4. **Support Ready**: Siapkan tim support internal
5. **Continuous Improvement**: Kumpulkan feedback dan optimasi

## Case Study

Salah satu klien kami, SPBU di area Jakarta, berhasil:
- Meningkatkan throughput 25%
- Mengurangi queue time 40%
- Mengeliminasi human error 90%
- Real-time inventory accuracy 99.9%

## Ready to Transform?

Hubungi PT. Manggala Utama Indonesia untuk konsultasi gratis mengenai transformasi digital SPBU Anda!`,
      featuredImage: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&auto=format&fit=crop",
      category: "technical",
      tags: JSON.stringify(["POS", "MCU", "SPBU", "integration", "technical"]),
      author: "Tim Engineering",
      publishedDate: new Date("2025-01-08"),
      active: true,
      featured: false,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Case Studies
    {
      id: nanoid(),
      title: "Case Study: Implementasi Fuel Management System untuk Transportasi Logistik",
      slug: "case-study-implementasi-fuel-management-system-transportasi-logistik",
      excerpt: "Studi kasus implementasi sistem fuel management untuk perusahaan transportasi logistik terkemuka di Indonesia.",
      content: `# Case Study: Transformasi Manajemen Fuel untuk Perusahaan Logistik

## Challenge

Sebuah perusahaan transportasi logistik terkemuka di Indonesia menghadapi tantangan besar dalam manajemen konsumsi BBM armada truk mereka:

### Masalah Utama:
- **Tidak ada visibility** real-time terhadap konsumsi BBM per kendaraan
- **Potensi loss** BBM mencapai 15-20% per bulan
- **Pencatatan manual** yang rawan human error
- **Tidak ada system** untuk mendeteksi pencurian atau kebocoran
- **Reporting** yang lambat dan tidak akurat

### Impact:
- Kerugian finansial signifikan
- Operational inefficiency
- Kesulitan dalam budget planning
- Lack of data untuk decision making

## Solution: PT. Manggala Utama Indonesia

PT. Manggala Utama Indonesia ditunjuk untuk menyediakan solusi **Fuel Management System** terintegrasi.

### Approach:

#### 1. Assessment Phase
- Survey operasional existing
- Analysis pain points
- Identify requirements
- Design custom solution

#### 2. Solution Design
Sistem yang diimplementasikan mencakup:

\`\`\`
┌─────────────────────────────────────────┐
│      Fleet Management Dashboard        │
│  - Real-time fuel consumption           │
│  - Vehicle tracking                     │
│  - Driver performance                   │
│  - Cost analysis                        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│        Central FMS Server               │
│  - Data aggregation                    │
│  - Analytics engine                     │
│  - Alert system                         │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Vehicle Units                   │
│  - Fuel sensors                         │
│  - GPS tracking                         │
│  - Driver auth                          │
└─────────────────────────────────────────┘
\`\`\`

#### 3. Implementation

**Hardware Installation:**
- Fuel sensor di masing-masing truk (150 unit)
- GPS tracker untuk real-time location
- Driver authentication system
- Onboard computer untuk data collection

**Software Deployment:**
- Central FMS server
- Web-based dashboard
- Mobile apps untuk driver
- Reporting system
- Alert & notification system

**Integration:**
- Integration dengan existing ERP
- Automated daily reports
- Fuel purchase tracking
- Maintenance scheduling

## Results

### 6 Months Post-Implementation:

#### Financial Impact:
- ✅ **Reduksi loss BBM**: Dari 15-20% menjadi <3%
- ✅ **Penghematan bulanan**: Rp 250-300 juta
- ✅ **ROI**: Tercapai dalam 8 bulan
- ✅ **Payback period**: 8 bulan

#### Operational Improvement:
- ✅ **Visibility**: 100% real-time tracking
- ✅ **Efficiency**: Peningkatan 25% dalam route planning
- ✅ **Accuracy**: Pencatatan 99.9% akurat
- ✅ **Response time**: Alert real-time untuk anomali

#### Management Benefits:
- ✅ **Data-driven decisions**: Analytics lengkap
- ✅ **Predictive maintenance**: Early detection
- ✅ **Driver accountability**: Performance tracking
- ✅ **Compliance**: Audit trail lengkap

## Key Success Factors

Apa yang membuat implementasi ini sukses:

1. **Strong Sponsorship**: Support penuh dari top management
2. **Phased Rollout**: Implementasi bertahap per region
3. **User Training**: Training komprehensif untuk semua user
4. **Change Management**: Managing resistance properly
5. **Continuous Support**: Ongoing support dari PT. Manggala Utama

## Lessons Learned

Key takeaways dari project ini:

- **Customization is key**: Setiap bisnis punya kebutuhan unik
- **User adoption critical**: Technology tanpa adoption = useless
- **Data quality matters**: Garbage in, garbage out
- **Integration essential**: Must connect dengan existing systems
- **Continuous improvement**: Never stop optimizing

## Future Plans

Perusahaan client berencana:
- AI-powered predictive analytics
- Electric vehicle integration
- Carbon footprint tracking
- Automated reordering system

## Conclusion

Implementasi Fuel Management System dari PT. Manggala Utama Indonesia berhasil memberikan **ROI signifikan** dalam waktu singkat. Transformasi digital ini tidak hanya mengurangi loss tetapi juga meningkatkan efisiensi operasional secara keseluruhan.

---

**Project Duration**: 6 months
**Investment**: Rp 1.8 M
**Annual Savings**: Rp 3-3.6 M
**ROI**: 167-200%

*Tertarik dengan hasil serupa untuk bisnis Anda? Hubungi PT. Manggala Utama Indonesia untuk konsultasi gratis!*`,
      featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
      category: "case_studies",
      tags: JSON.stringify(["case study", "fuel management", "logistik", "ROI"]),
      author: "Tim Solutions",
      publishedDate: new Date("2025-01-05"),
      active: true,
      featured: true,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Industry News
    {
      id: nanoid(),
      title: "Tren Digitalisasi SPBU di Indonesia 2025: Apa yang Perlu Diketahui?",
      slug: "tren-digitalisasi-spbu-indonesia-2025",
      excerpt: "Menganalisis tren digitalisasi SPBU di Indonesia dan bagaimana PT. Manggala Utama Indonesia membantu transformasi ini.",
      content: `# Tren Digitalisasi SPBU Indonesia 2025

Industri SPBU di Indonesia sedang mengalami transformasi digital yang signifikan. PT. Manggala Utama Indonesia berada di garis depan revolusi ini.

## Current Landscape

### Digital Adoption Rate
Berdasarkan data industri 2024:
- **60%** SPBU besar di kota-kota major sudah digital
- **35%** SPBU menengah mulai adopt digital
- **Target 2027**: 90% SPBU di Indonesia terdigitalisasi

### Key Drivers

#### 1. Regulation
Pemerintah mendorong digitalisasi melalui:
- Mandatory integration dengan sistem monitoring
- Reporting requirement yang lebih strict
- Incentive untuk SPBU digital

#### 2. Consumer Behavior
Konsumen mengharapkan:
- Cashless payment options
- Digital receipts
- Loyalty programs
- Mobile apps

#### 3. Operational Efficiency
SPBU perlu:
- Reduce operational cost
- Improve accuracy
- Better inventory management
- Data-driven decisions

## Top Trends in 2025

### 1. Cloud-Based Management
\`\`\`
Traditional → Cloud Migration
├── On-premise server
├── Manual backup
└── Limited access

Cloud-based
├── Real-time sync
├── Automated backup
├── Multi-location access
└── Scalable infrastructure
\`\`\`

### 2. AI & Analytics
- **Predictive maintenance**: AI memprediksi equipment failure
- **Demand forecasting**: Prediksi demand BBM
- **Price optimization**: Dynamic pricing algorithms
- **Anomaly detection**: Fraud detection otomatis

### 3. IoT Integration
- **Smart sensors**: Monitoring real-time equipment
- **Connected devices**: Semua perangkat terhubung
- **Edge computing**: Processing data di lokasi
- **5G ready**: Preparation untuk 5G rollout

### 4. Mobile-First
- **Mobile payments**: QR, e-wallet, mobile banking
- **Mobile apps**: Customer engagement via apps
- **Driver apps**: Enhanced experience untuk driver
- **Push notifications**: Real-time updates

### 5. Sustainability
- **Carbon tracking**: Monitor emissions
- **Energy efficiency**: Optimasi konsumsi energi
- **Green reporting**: ESG compliance
- **Alternative fuels**: Integration dengan EV charging

## Implementation Challenges

Tantangan utama dalam digitalisasi:

### Technical
- Legacy system integration
- Infrastructure readiness
- Data security concerns
- Scalability requirements

### Organizational
- Resistance to change
- Skill gap
- Training needs
- Change management

### Financial
- Initial investment
- ROI uncertainty
- Ongoing costs
- Technology obsolescence

## PT. Manggala Utama Indonesia's Approach

### Comprehensive Solutions

Kami menyediakan end-to-end solutions:

\`\`\`
1. Assessment
   ├── Infrastructure audit
   ├── Gap analysis
   └── ROI calculation

2. Design
   ├── System architecture
   ├── Technology selection
   └── Integration planning

3. Implementation
   ├── Phased rollout
   ├── Training programs
   └── Go-live support

4. Optimization
   ├── Performance tuning
   ├── Continuous improvement
   └── Innovation updates
\`\`\`

### Key Differentiators

- **Local expertise**: Understand Indonesia market
- **Proven track record**: Successful implementations
- **Full-stack capability**: Hardware to software
- **Ongoing support**: Long-term partnership

## Future Outlook

### 2025-2030 Predictions

- **2025**: 70% SPBU digital adoption
- **2027**: Full digital ecosystem maturity
- **2030**: AI-driven autonomous operations

### Emerging Technologies

- **Blockchain**: Secure transactions
- **Digital twins**: Virtual representation
- **AR/VR**: Training & maintenance
- **Edge AI**: Local intelligence

## Call to Action

Jangan tertinggal dalam transformasi digital:

1. **Assess your readiness**: Evaluasi current state
2. **Plan your journey**: Create roadmap
3. **Choose the right partner**: Work dengan experts
4. **Start small, think big**: Pilot & scale

## How We Can Help

PT. Manggala Utama Indonesia siap membantu:

✅ Free consultation & assessment
✅ Custom solution design
✅ Phased implementation
✅ Comprehensive training
✅ Ongoing support & maintenance

**Hubungi kami hari ini untuk memulai perjalanan digital SPBU Anda!**

---

*Stay updated dengan tren industri lainnya dengan subscribe newsletter kami.*`,
      featuredImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop",
      category: "industry",
      tags: JSON.stringify(["digital transformation", "SPBU", "trends 2025", "indonesia"]),
      author: "Tim Research",
      publishedDate: new Date("2025-01-01"),
      active: true,
      featured: false,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  try {
    await db.insert(articles).values(articleData);
    console.log("✅ Articles seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding articles:", error);
  }
}

async function main() {
  console.log("🌱 Starting seed process...");

  await seedFAQs();
  await seedArticles();

  console.log("✨ Seed process completed!");
}

main().catch(console.error);
