import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { solutions } from "@/lib/data/solutions";
import { FAQSection } from "@/components/faq-section";
import { 
  Fuel, 
  Server, 
  Network, 
  ShoppingCart, 
  Settings, 
  CheckCircle2, 
  ArrowLeft,
  Activity,
  ArrowRight,
  Zap,
  Phone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TechHero } from "@/components/ui/tech-hero";
import { TechPatternWrapper } from "@/components/ui/tech-pattern";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/animations";

const solutions = {
  "fueling": {
    title: "Fueling & ATG System",
    badge: "Otomatisasi Energi",
    description: "Sistem otomasi SPBU dan manajemen bahan bakar industri yang menjamin akurasi data dan efisiensi operasional.",
    icon: Fuel,
    accentColor: "from-orange-500/20 to-amber-500/10",
    accentBorder: "border-orange-500/30",
    accentText: "text-orange-400",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop",
    overview: "PT. Manggala Utama Indonesia menyediakan sistem Automatic Tank Gauging (ATG) dan Fuel Management System (FMS) yang dirancang khusus untuk operator SPBU dan fasilitas penyimpanan bahan bakar industri. Sistem kami memberikan visibilitas penuh terhadap stok BBM secara real-time.",
    features: [
      { title: "Monitoring Stok Real-time", desc: "Pantau volume bahan bakar, temperatur, dan kadar air secara akurat dari mana saja." },
      { title: "Deteksi Kebocoran (Leak Detection)", desc: "Sistem peringatan dini untuk mencegah kerugian finansial dan pencemaran lingkungan." },
      { title: "Automatisasi Rekonsiliasi", desc: "Bandingkan stok fisik dengan data penjualan secara otomatis setiap hari." },
      { title: "Integrasi Controller", desc: "Menghubungkan ATG dengan dispenser untuk kontrol total sistem." },
      { title: "Laporan Kepatuhan", desc: "Mempermudah pelaporan inventaris untuk audit internal maupun regulasi." }
    ],
    workflow: [
      { title: "Sensor ATG", desc: "Sensor presisi tinggi mendeteksi level cairan dalam tangki." },
      { title: "Transmisi Data", desc: "Data dikirim secara aman ke Master Control Unit." },
      { title: "Olah Data", desc: "Software mengolah data mentah menjadi informasi inventaris." },
      { title: "Output", desc: "Data ditampilkan di dashboard dan terintegrasi dengan POS." }
    ]
  },
  "integration": {
    title: "Integrasi POS, MCU & EDC",
    badge: "Sistem Terintegrasi",
    description: "Otorisasi transaksi yang mulus dan sistem kontrol dispenser otomatis untuk bisnis retail modern.",
    icon: Server,
    accentColor: "from-blue-500/20 to-cyan-500/10",
    accentBorder: "border-blue-500/30",
    accentText: "text-blue-400",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&auto=format&fit=crop",
    overview: "Kami mengintegrasikan sistem Point of Sales (POS) dengan Master Control Unit (MCU) dan perangkat EDC untuk menciptakan ekosistem pembayaran yang aman dan terkontrol. Solusi ini meminimalkan kesalahan manusia dalam pencatatan transaksi.",
    features: [
      { title: "Otorisasi Dispensasi Otomatis", desc: "Dispenser hanya akan aktif setelah transaksi divalidasi sistem." },
      { title: "Multi-Payment Integration", desc: "Mendukung berbagai metode pembayaran: Cash, EDC, E-Wallet, dan QRIS." },
      { title: "Centralized Monitoring", desc: "Pantau semua aktivitas transaksi dari kantor pusat secara terpusat." },
      { title: "MCU Configuration", desc: "Setup controller untuk mengelola berbagai merk dispenser industri." },
      { title: "Fraud Prevention", desc: "Mengurangi resiko manipulasi data penjualan dengan sistem validasi berlapis." }
    ],
    workflow: [
      { title: "Input POS", desc: "Kasir memasukkan jumlah atau volume pembelian." },
      { title: "Otorisasi EDC", desc: "Pelanggan melakukan pembayaran melalui mesin EDC." },
      { title: "Sinyal MCU", desc: "MCU mengirim perintah ke dispenser untuk aktif." },
      { title: "Closing", desc: "Data dispensasi dikirim kembali ke POS untuk finalisasi." }
    ]
  },
  "network": {
    title: "Infrastruktur Jaringan",
    badge: "Konektivitas Industri",
    description: "Desain dan implementasi jaringan data handal untuk menunjang operasional industri yang mission-critical.",
    icon: Network,
    accentColor: "from-purple-500/20 to-violet-500/10",
    accentBorder: "border-purple-500/30",
    accentText: "text-purple-400",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&auto=format&fit=crop",
    overview: "Di era industri 4.0, konektivitas adalah jantung operasional. Kami menyediakan layanan instalasi Fiber Optic, LAN, dan Industrial WiFi dengan standar performa dan keamanan tertinggi untuk lingkungan industri.",
    features: [
      { title: "Backbone Fiber Optic", desc: "Instalasi kabel FO indoor dan outdoor dengan splicing presisi tinggi." },
      { title: "Industrial Switching", desc: "Implementasi switch yang tahan terhadap interferensi elektromagnetik." },
      { title: "Wireless Solution", desc: "Setup Access Point untuk coverage luas di area gudang atau pabrik." },
      { title: "Network Security", desc: "Konfigurasi Firewall dan IPS untuk melindungi data perusahaan." },
      { title: "Testing & Commissioning", desc: "Verifikasi performa jaringan dengan alat ukur standar enterprise." }
    ],
    workflow: [
      { title: "Site Survey", desc: "Analisis lokasi dan kebutuhan bandwidth aktual." },
      { title: "Network Design", desc: "Pembuatan topologi dan pemilihan perangkat optimal." },
      { title: "Implementation", desc: "Penarikan kabel dan konfigurasi semua perangkat." },
      { title: "Verification", desc: "Pengetesan throughput dan stabilitas jaringan." }
    ]
  },
  "procurement": {
    title: "Pengadaan Perangkat IT",
    badge: "Hardware Supply",
    description: "Layanan pengadaan hardware dan software IT yang disesuaikan dengan spesifikasi teknis proyek Anda.",
    icon: ShoppingCart,
    accentColor: "from-emerald-500/20 to-green-500/10",
    accentBorder: "border-emerald-500/30",
    accentText: "text-emerald-400",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop",
    overview: "PT. Manggala Utama Indonesia melayani pengadaan perangkat IT skala korporat dan industri. Kami memastikan setiap perangkat yang kami sediakan memiliki garansi resmi dan spesifikasi yang tepat guna untuk kebutuhan operasional Anda.",
    features: [
      { title: "Enterprise Server & Storage", desc: "Solusi server berperforma tinggi untuk database dan aplikasi enterprise." },
      { title: "Industrial PC & Workstation", desc: "Perangkat komputasi tangguh untuk area produksi dan kontrol." },
      { title: "Networking Gear", desc: "Pengadaan Router, Switch, dan Firewall merk ternama dunia." },
      { title: "End-user Device", desc: "Pengadaan Laptop, Mini PC, dan Workstation untuk kebutuhan kantor." },
      { title: "IT Support", desc: "Layanan instalasi dan konfigurasi awal perangkat yang dibeli." }
    ],
    workflow: [
      { title: "Consultation", desc: "Identifikasi spesifikasi teknis yang dibutuhkan." },
      { title: "Quotation", desc: "Pemberian penawaran harga kompetitif dan transparan." },
      { title: "Procurement", desc: "Proses pemesanan dan quality control barang." },
      { title: "Delivery & Setup", desc: "Pengiriman dan instalasi di lokasi klien." }
    ]
  },
  "maintenance": {
    title: "Maintenance & SLA",
    badge: "Layanan Purna Jual",
    description: "Dukungan teknis berkelanjutan untuk menjaga sistem Anda tetap berjalan maksimal 24/7.",
    icon: Settings,
    accentColor: "from-red-500/20 to-rose-500/10",
    accentBorder: "border-red-500/30",
    accentText: "text-red-400",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&auto=format&fit=crop",
    overview: "Maintenance yang rutin adalah kunci umur panjang sistem industri. Kami menawarkan skema Service Level Agreement (SLA) yang fleksibel, disesuaikan dengan kebutuhan operasional dan anggaran bisnis Anda.",
    features: [
      { title: "Preventive Maintenance", desc: "Pengecekan rutin terjadwal untuk mencegah kerusakan mendadak." },
      { title: "Corrective Maintenance", desc: "Respon cepat dan terukur untuk perbaikan sistem yang bermasalah." },
      { title: "SLA Response Time", desc: "Jaminan kedatangan teknisi dalam waktu yang telah disepakati." },
      { title: "Spare Part Inventory", desc: "Stok suku cadang kritis untuk penggantian cepat tanpa downtime lama." },
      { title: "Reporting & Audit", desc: "Laporan berkala kondisi sistem dan rekomendasi upgrade terperinci." }
    ],
    workflow: [
      { title: "Contract Setup", desc: "Penentuan parameter SLA dan jadwal kunjungan rutin." },
      { title: "Routine Check", desc: "Pelaksanaan pemeliharaan sesuai jadwal yang disepakati." },
      { title: "Emergency Call", desc: "Respon cepat untuk troubleshooting darurat di lokasi." },
      { title: "Status Report", desc: "Penyampaian laporan kondisi sistem secara berkala ke klien." }
    ]
  }
};

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions[slug as keyof typeof solutions];

  if (!solution) {
    notFound();
  }

  const Icon = solution.icon;

  return (
    <div className="flex flex-col min-h-screen bg-[oklch(0.12_0.02_260)]">
      {/* Hero Section — TechHero canvas */}
      <TechHero
        badge={solution.badge}
        minHeight="min-h-[65vh]"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05] text-white">
            {solution.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              {solution.title.split(" ").slice(-1)[0]}
            </span>
          </h1>
        }
        subtitle={solution.description}
      >
        {/* Back button + CTA row */}
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <Button variant="outline" asChild className="h-11 px-6 rounded-2xl border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white gap-2">
            <Link href="/solutions">
              <ArrowLeft className="h-4 w-4" /> Kembali ke Layanan
            </Link>
          </Button>
          <Button asChild className="h-11 px-6 rounded-2xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] gap-2">
            <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20butuh%20konsultasi%20mengenai%20solusi%20teknis%20ini." target="_blank">
              <Phone className="h-4 w-4" /> Konsultasi Gratis
            </Link>
          </Button>
        </div>
      </TechHero>

      {/* Main Content */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Column: Overview & Features */}
            <div className="space-y-12">
              <SlideIn direction="left">
                <div className="space-y-4">
                  <Badge variant="outline" className="px-4 py-2 border-white/15 text-white/60">Gambaran Solusi</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
                    Apa yang Kami{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      Tawarkan?
                    </span>
                  </h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    {solution.overview}
                  </p>
                </div>
              </SlideIn>

              {/* Features Card */}
              <SlideIn direction="left" delay={0.2}>
                <div className={`rounded-2xl p-8 bg-gradient-to-br ${solution.accentColor} border ${solution.accentBorder} backdrop-blur-sm`}>
                  <h3 className="text-xl font-bold flex items-center gap-3 mb-8 text-white font-heading">
                    <div className={`p-2 rounded-lg bg-white/10 border ${solution.accentBorder}`}>
                      <CheckCircle2 className={`h-5 w-5 ${solution.accentText}`} />
                    </div>
                    Fitur Unggulan
                  </h3>

                  <StaggerContainer className="space-y-6">
                    {solution.features.map((feature, idx) => (
                      <StaggerItem key={idx}>
                        <div className="flex gap-4 items-start group">
                          <div className={`mt-1 h-6 w-6 rounded-full border ${solution.accentBorder} bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors`}>
                            <span className={`text-xs font-bold ${solution.accentText}`}>{idx + 1}</span>
                          </div>
                          <div>
                            <h4 className={`font-bold text-white mb-1 group-hover:${solution.accentText} transition-colors text-sm md:text-base`}>
                              {feature.title}
                            </h4>
                            <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </SlideIn>
            </div>

            {/* Right Column: Image + Workflow */}
            <div className="space-y-12">
              {/* Solution Image */}
              <SlideIn direction="right">
                <div className="relative h-[280px] md:h-[360px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay with icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260)]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border ${solution.accentBorder}`}>
                      <Icon className={`h-5 w-5 ${solution.accentText}`} strokeWidth={1.5} />
                      <span className="text-white font-semibold text-sm">{solution.title}</span>
                    </div>
                  </div>
                </div>
              </SlideIn>

              {/* Workflow Timeline */}
              <SlideIn direction="right" delay={0.2}>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                  <div className="p-6 border-b border-white/8 flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white">Alur Kerja Implementasi</h3>
                  </div>
                  <div className="p-6">
                    <StaggerContainer className="space-y-0">
                      {solution.workflow.map((item, idx) => (
                        <StaggerItem key={idx}>
                          <div className="relative flex gap-5 items-start group pb-8 last:pb-0">
                            {/* Connector line */}
                            {idx < solution.workflow.length - 1 && (
                              <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                            )}
                            {/* Step number bubble */}
                            <div className={`relative h-10 w-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 z-10 bg-gradient-to-br ${solution.accentColor} border ${solution.accentBorder} group-hover:border-primary/60 transition-all shadow-[0_0_15px_rgba(var(--primary),0.2)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.4)]`}>
                              <span className={solution.accentText}>{idx + 1}</span>
                            </div>
                            <div className="pt-1.5">
                              <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Technical Support" },
              { value: "< 2 Jam", label: "Response Time" },
              { value: "10+ Thn", label: "Pengalaman" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-primary/30 transition-colors">
                <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10 pointer-events-none" />
        <TechPatternWrapper variant="grid" opacity={0.03}>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <FadeIn>
              <Badge variant="outline" className="mb-6 px-5 py-2 border-primary/30 text-primary/80 bg-primary/5">
                <Zap className="w-3.5 h-3.5 mr-2" />
                Siap Memulai?
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black mb-6 font-heading text-white max-w-3xl mx-auto leading-tight">
                Implementasikan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  {solution.title}
                </span>{" "}
                untuk Bisnis Anda
              </h2>
              <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
                Diskusikan kebutuhan proyek Anda dengan tim arsitek solusi kami untuk implementasi yang tepat guna dan efisien.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="h-14 px-10 rounded-2xl bg-primary text-white font-bold text-lg shadow-[0_0_30px_rgba(var(--primary),0.4)] hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] hover:-translate-y-0.5 transition-all">
                  <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20ingin%20mengajukan%20inquiry%20terkait%20solusi%20ini." target="_blank" className="flex items-center gap-2">
                    Ajukan Inquiry <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-10 rounded-2xl border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-lg hover:-translate-y-0.5 transition-all">
                  <Link href="/portfolio">
                    Lihat Studi Kasus
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </TechPatternWrapper>
      </section>
      {/* Dynamic Solution FAQ */}
      <FAQSection
        category={solution.id === 'fueling' ? 'products' : 'solutions'}
        title={`Pertanyaan Seputar ${solution.title}`}
        subtitle="Rincian mengenai integrasi, estimasi biaya, dan spesifikasi pendukung"
        limit={3}
      />
    </div>
  );
}
