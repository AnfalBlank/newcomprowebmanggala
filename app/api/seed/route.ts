import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { products, projects, resources, faqs } from "@/server/db/schema";
import { nanoid } from "nanoid";

// Use GET for easy triggering via browser
export async function GET(request: NextRequest) {
  try {
    // Purge old mocks to inject fresh requested data
    await db.delete(products);
    await db.delete(projects);
    await db.delete(resources);
    await db.delete(faqs);

    // 11 Products (5 IT, 3 Fuel, 3 Software Development)
    const productData = [
      // 5 IT Products
      {
        name: "Enterprise Rack Server 1U",
        category: "it",
        description: "Server rackmount high-performance untuk aplikasi mission critical.",
        features: "Dual Intel Xeon, Redundant PSU, Hardware RAID, Remote Management",
        area: "Data Center, Server Room",
        imageUrl: "https://images.unsplash.com/photo-1558494949-efc5e60dc549?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Industrial Network Managed Switch",
        category: "it",
        description: "Managed switch level industri dengan ketahanan suhu ekstrim.",
        features: "Gigabit ports, PoE+, Ring topology support, DIN-rail mount",
        area: "Plant Floor, Outdoor Cabinet",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Next-Gen Firewall Appliance",
        category: "it",
        description: "Perangkat keamanan jaringan canggih untuk memblokir ancaman cyber.",
        features: "Deep Packet Inspection, VPN Hub, Intrusion Prevention",
        area: "Headquarters, Cabang",
        imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Industrial Rugged POS",
        category: "it",
        description: "Point of Sales industrial keras tahan air dan debu.",
        features: "IP65 Rated, Fanless, Multi-serial, Touchscreen Display",
        area: "Retail SPBU, Manufaktur",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Enterprise Data Storage Array",
        category: "it",
        description: "Sistem storage massal enterprise dengan backup otomatis.",
        features: "NVMe Caching, Scalable Petabytes, Fibre Channel",
        area: "Server Room, DRC",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
      },

      // 3 Fuel Products
      {
        name: "ATG Console Plus Monitoring",
        category: "fueling",
        description: "Sistem monitoring tangki otomatis (Automatic Tank Gauging) kelas atas.",
        features: "Real-time monitoring, Leak detection, Inventory reporting, Web access",
        area: "SPBU, Depo Industri",
        imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Portable Density & Sounding Meter",
        category: "fueling",
        description: "Alat ukur densitas bahan bakar portable dengan akurasi tinggi.",
        features: "Akurasi 0.001 g/cm3, Temperature compensation, Bluetooth",
        area: "SPBU, Depo BBM, Laboratorium",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Forecourt Controller V2",
        category: "fueling",
        description: "Master Control Unit (MCU) controller mutakhir pengatur dispenser dan pembayaran.",
        features: "Protocol conversion, Forecourt control, Secure transaction, Offline mode",
        area: "Sistem Otomatisasi SPBU",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
      },

      // 3 Software Development Products
      {
        name: "ERP Enterprise Suite",
        category: "software",
        description: "Sistem Enterprise Resources Planning terintegrasi untuk manufaktur dan distribusi.",
        features: "HR Module, Inventory Tracking, Finance, Real-time Dashboard",
        area: "Kantor Pusat, Pabrik",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Smart Fleet Management Mobile APP",
        category: "software",
        description: "Aplikasi seluler terpusat untuk pelacakan distribusi logistik bahan bakar.",
        features: "GPS Tracking, Geo-fencing, iOS & Android, Delivery Proof",
        area: "Logistik, Transport",
        imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Fuel Inventory Gateway DB",
        category: "software",
        description: "Gateway data penghubung ATG hardware ke core server pusat Pertamina.",
        features: "API Integration, 99.9% Uptime, Secure Tunnel, Big Data Sync",
        area: "Infrastructure Software",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
      }
    ];

    for (const p of productData) {
      await db.insert(products).values({
        id: nanoid(),
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // 10 Partner Projects
    const projectData = [
      {
        title: "Integrasi Jaringan SPBU Gas Station",
        category: "IT Infrastructure",
        description: "Pembangunan instalasi jaringan POS dan CCTV untuk 20 cabang.",
        client: "PT. Energi Nasional",
        year: "2023",
        scope: "Supply, Cabling, Commissioning",
        imageUrl: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Otomatisasi Sistem Depo BBM",
        category: "Fuel Automation",
        description: "Implementasi ATG Console di storage raksasa untuk pemantauan Real-time.",
        client: "Logistik BBM Utama",
        year: "2024",
        scope: "Controller Setup, Software Sync",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Aplikasi Fleet Tracker Truk BBM",
        category: "Software Development",
        description: "Pembuatan aplikasi mobile internal pelacakan truk pengangkut bahan bakar.",
        client: "Transportasi Indomakmur",
        year: "2022",
        scope: "UI/UX, Backend Development, Mobile Dev",
        imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Upgrade Fiber Optic Pabrik Elektronik",
        category: "IT Infrastructure",
        description: "Upgrade infrastruktur backhaul pabrik dengan 10G fiber dan industrial switch.",
        client: "Global Electronic Mfg",
        year: "2021",
        scope: "Cabling, Topology Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Instalasi Data Center Rumah Sakit",
        category: "IT Infrastructure",
        description: "Pembangunan ruang server dingin dan rak enterprise untuk RSUD.",
        client: "RSUD Provinsi",
        year: "2023",
        scope: "Procurement, Installation, Data Migration",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Custom ERP Modul HR & Finance",
        category: "Software Development",
        description: "Customisasi platform ERP Manggala untuk pencatatan slip gaji dan logistik.",
        client: "PT. Sukses Retail",
        year: "2023",
        scope: "Full-stack Dev, Database Architecture",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Master Control Unit (MCU) SPBU Rest Area",
        category: "Fuel Automation",
        description: "Konfigurasi dispenser dengan 4 pompa menggunakan sistem Manggala MCU V2.",
        client: "Jasa Marga Service",
        year: "2022",
        scope: "Hardware Provisioning, Setup",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Cyber Security Audit Firewall",
        category: "IT Security",
        description: "Analisis kebocoran traffic jaringan dan implementasi Next-Gen Firewall.",
        client: "Bank Daerah Syariah",
        year: "2024",
        scope: "Cyber-audit, Firewall Injection",
        imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Pembuatan Website E-Commerce B2B",
        category: "Software Development",
        description: "Desain sistem pemesanan online perabot skala pabrik otomatis.",
        client: "Furniture Lestari",
        year: "2021",
        scope: "Web Application, Cloud Hosting",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "Manajemen Sistem Tangki BBM Pertambangan",
        category: "Fuel Automation",
        description: "Instalasi alat ukur Fuel Density dan setup ATG di area tambang kalimantan.",
        client: "Bara Energi Kaltim",
        year: "2020",
        scope: "On-field Engineering, Deployment",
        imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop"
      }
    ];

    for (const p of projectData) {
      await db.insert(projects).values({
        id: nanoid(),
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Seed FAQs matching page contexts
    const faqData = [
      // 1. General (Beranda)
      {
        question: "Apakah PT. Manggala Utama Indonesia melayani instalasi di seluruh wilayah Indonesia?",
        answer: "Ya, kami memiliki tim engineer tersertifikasi yang siap ditugaskan ke seluruh penjuru Nusantara, termasuk ke site area remote. \n\nMari wujudkan ekosistem infrastruktur yang prima, **mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "general",
        isActive: true
      },
      {
        question: "Berapa lama estimasi waktu penyelesaian (SLA) untuk integrasi infrastruktur IT?",
        answer: "Waktu pengerjaan sangat bergantung pada skala proyek. Namun, kami menerapkan standar ketat project-management untuk memastikan timeline tercapai tanpa mengurangi kualitas. \n\nKonsultasikan desain arsitektur Anda kepada kami, **mulai project Anda bersama PT. Manggala Utama Indonesia sekarang**, dan lihat perubahannya!",
        category: "general",
        isActive: true
      },
      // 2. About
      {
        question: "Sertifikasi dan standar kualitas apa yang diterapkan oleh perusahaan?",
        answer: "Kami membanggakan standar kepatuhan tinggi dari lisensi ISO untuk instalasi hardware serta standarisasi keselamatan kerja (K3) migas, terutama dalam deployment Fueling System. \n\nButuh mitra yang legal dan bersertifikasi? **Mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "about",
        isActive: true
      },
      {
        question: "Apakah ada jaminan maintenance (purna jual) setelah proyek selesai?",
        answer: "Tentu. Setiap solusi yang kami deploy disertai masa penjaminan (warranty) serta kontrak Maintenance SLA 24/7 yang bisa diperpanjang agar operasional Anda tidak terputus. \n\nPastikan bisnis Anda ditangani oleh ahlinya, **mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "about",
        isActive: true
      },
      // 3. Products
      {
        question: "Apakah perangkat IT dan Mesin SPBU yang disediakan asli dan bergaransi resmi?",
        answer: "Semua hardware kami, mulai dari produk IT Server hingga mesin dispenser Pertamina, didistribusikan langsung dari principal kelas dunia dengan garansi resmi dan suku cadang asli. \n\nPercepat modernisasi perangkat di site Anda, **mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "products",
        isActive: true
      },
      {
        question: "Bisakah perangkat ini diintegrasikan dengan aplikasi kasir (POS) atau ERP yang sudah ada?",
        answer: "Sangat bisa. Kami tidak hanya menjual barang, tetapi juga merakit API (Application Programming Interface) untuk memastikan kontrol hardware kami tersinkronisasi mulus ke platform ERP eksisting Anda. \n\nTinggalkan sistem manual yang merepotkan, **mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "products",
        isActive: true
      },
      // 4. Solutions
      {
        question: "Bagaimana tahapan deployment solusi end-to-end dari Manggala?",
        answer: "Kami memulai dengan Assessment & Design gratis. Setelah Anda menyetujui cetak biru rancangan kami, proses akan berlanjut ke perakitan, instalasi lapangan, hingga training operator. \n\nTidak perlu pusing memikirkan teknis eksekusi, biarkan kami yang bergerak. **Mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "solutions",
        isActive: true
      },
      {
        question: "Apakah solusi software development mendukung penyimpanan skala raksasa?",
        answer: "Infrastruktur cloud dan database arsitektur kami dirancang spesifik untuk beban Enterprise. Skalabilitas jaringan adalah keahlian utama kami baik untuk hosting lokal (On-Premise) maupun cloud. \n\nBerikan pondasi paling stabil untuk inovasi digital Anda, **mulai project Anda bersama PT. Manggala Utama Indonesia sekarang!**",
        category: "solutions",
        isActive: true
      }
    ];

    for (const f of faqData) {
      await db.insert(faqs).values({
        id: nanoid(),
        ...f,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, message: "Database seeded perfectly with requested exact figures" });
  } catch (error) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
