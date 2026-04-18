'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { InfinitePartnerLogos } from "@/components/partner-logos";
import { TechHero } from "@/components/ui/tech-hero";
import { FAQSection } from "@/components/faq-section";
import { useTranslation } from "@/context/LanguageContext";
import {
  Fuel,
  Server,
  Network,
  Settings,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  Building2,
  Factory,
  Award,
  Users,
  Shield,
  Zap,
  Globe,
  Cpu
} from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  const services = [
    {
      title: "Fueling & ATG System",
      description: "Otomatisasi monitoring tangki BBM real-time, deteksi kebocoran, dan rekonsiliasi otomatis untuk SPBU dan fasilitas industri.",
      header: (
        <div className="relative flex h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent border border-orange-500/20 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-orange-500/10 animate-ping absolute" style={{animationDuration: '3s'}} />
            <div className="w-20 h-20 rounded-full bg-orange-500/15 animate-pulse absolute" />
          </div>
          <Fuel className="w-14 h-14 text-orange-400 relative z-10 drop-shadow-[0_0_12px_rgba(251,146,60,0.6)]" />
        </div>
      ),
      icon: <Fuel className="h-4 w-4 text-orange-400" />,
      accentColor: "orange",
      className: "md:col-span-2",
      href: "/solutions/fueling"
    },
    {
      title: "Integrasi POS & MCU",
      description: "Ekosistem pembayaran terintegrasi — POS, EDC, dan dispenser dalam satu kontrol terpusat.",
      header: (
        <div className="relative flex h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent border border-blue-500/20 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-blue-500/10 animate-ping absolute" style={{animationDuration: '3.5s'}} />
            <div className="w-20 h-20 rounded-full bg-blue-500/15 animate-pulse absolute" />
          </div>
          <Server className="w-14 h-14 text-blue-400 relative z-10 drop-shadow-[0_0_12px_rgba(96,165,250,0.6)]" />
        </div>
      ),
      icon: <Server className="h-4 w-4 text-blue-400" />,
      accentColor: "blue",
      className: "md:col-span-1",
      href: "/solutions/integration"
    },
    {
      title: "Infrastruktur Jaringan",
      description: "Fiber Optic, Industrial WiFi, dan Network Security standar enterprise untuk industri 4.0.",
      header: (
        <div className="relative flex h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-transparent border border-purple-500/20 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-purple-500/10 animate-ping absolute" style={{animationDuration: '4s'}} />
            <div className="w-20 h-20 rounded-full bg-purple-500/15 animate-pulse absolute" />
          </div>
          <Network className="w-14 h-14 text-purple-400 relative z-10 drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]" />
        </div>
      ),
      icon: <Network className="h-4 w-4 text-purple-400" />,
      accentColor: "purple",
      className: "md:col-span-1",
      href: "/solutions/network"
    },
    {
      title: "Maintenance & SLA",
      description: "Layanan purna jual 24/7 — preventive & corrective maintenance dengan jaminan response time SLA.",
      header: (
        <div className="relative flex h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent border border-green-500/20 items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-green-500/10 animate-ping absolute" style={{animationDuration: '2.5s'}} />
            <div className="w-20 h-20 rounded-full bg-green-500/15 animate-pulse absolute" />
          </div>
          <Settings className="w-14 h-14 text-green-400 relative z-10 drop-shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
        </div>
      ),
      icon: <Settings className="h-4 w-4 text-green-400" />,
      accentColor: "green",
      className: "md:col-span-2",
      href: "/solutions/maintenance"
    }
  ];

  const stats = [
    { label: "Years Experience", value: "10+", icon: Award },
    { label: "Projects Completed", value: "500+", icon: CheckCircle },
    { label: "Expert Technicians", value: "50+", icon: Users },
    { label: "Support Response", value: "24/7", icon: Shield },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section — wrapped in TechHero for animated circuit background */}
      <TechHero
        minHeight="min-h-[100dvh]"
        className="items-start lg:items-center"
        contentClassName="!pt-8 md:!pt-12"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full pt-0 mt-6 lg:mt-0">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-white/10 bg-white/5 text-blue-300 font-bold tracking-widest uppercase text-[10px]">
                System Integrator & Engineering
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-6 lg:mb-8 leading-[1.1] text-white"
            >
              Driving <span className="text-blue-400 italic">Innovation</span>{" "}
              <br />
              in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-400 to-blue-300">
                Engineering.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-white/60 mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto px-4 sm:px-0"
            >
              <Button size="lg" className="h-14 px-8 sm:px-10 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all w-full sm:w-auto">
                <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20Engineering%20&%20Integrasi%20Anda." target="_blank" className="flex items-center justify-center gap-2 w-full">
                  Start Project <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 sm:px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-bold text-base sm:text-lg text-white w-full sm:w-auto">
                <Link href="/solutions" className="flex items-center justify-center w-full">View Solutions</Link>
              </Button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-10 lg:mt-12 pt-8 border-t border-white/5 mx-4 sm:mx-0"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-3xl font-black text-white mb-1 font-heading">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[480px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full animate-pulse" />
              <div className="absolute inset-4 border border-white/5 rounded-3xl overflow-hidden group">
                <Image 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop"
                  alt="Engineering"
                  fill
                  className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260)] via-transparent to-transparent" />
                <div className="absolute top-8 left-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Cpu className="w-8 h-8 text-blue-400" />
                </div>
                <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <Zap className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </TechHero>

      {/* Services Section */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary text-[10px] uppercase tracking-[0.3em]">
              Expertise
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-6">
              Industrial <span className="text-primary">Ecosystem</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Menghubungkan teknologi dan operasional dengan solusi yang scalable dan handal.
            </p>
          </div>

          <BentoGrid className="max-w-7xl mx-auto px-4">
            {services.map((service, i) => (
              <Link key={i} href={service.href} className={service.className}>
                <BentoGridItem
                  title={service.title}
                  description={service.description}
                  header={service.header}
                  icon={service.icon}
                  accentColor={service.accentColor}
                  href={service.href}
                  className="h-full"
                />
              </Link>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Trust / Sectors Section */}
      <section className="py-16 px-6 bg-white/[0.02] border-y border-white/5 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Globe, title: "SPBU & Energi", text: "Automasi sistem bahan bakar dan monitoring tangki realtime." },
                  { icon: Building2, title: "Hospitality & Hotel", text: "Infrastruktur WiFi dan sistem keamanan terintegrasi." },
                  { icon: Factory, title: "Manufaktur", text: "IoT industri dan kontrol sistem produksi efisien." },
                  { icon: Shield, title: "Enterprise IT", text: "Keamanan jaringan dan pengadaan hardware berkualitas." }
                ].map((sector, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/30 transition-all hover:bg-card/80 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <sector.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-heading">{sector.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{sector.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <Badge variant="outline" className="mb-6 border-accent/20 bg-accent/5 text-accent text-[10px] uppercase tracking-[0.3em]">
                Sectors
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-8">
                Driving Growth Across <span className="text-accent underline decoration-accent/30 underline-offset-8">Industries.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Kami memahami tantangan unik setiap industri. Solusi kami dirancang untuk memenuhi standar kepatuhan dan efisiensi tertinggi di berbagai sektor bisnis Indonesia.
              </p>
              <Button variant="link" className="text-primary font-bold text-lg p-0 h-auto group">
                <Link href="/solutions" className="flex items-center gap-2">
                  Explore industrial solutions <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logos */}
      <section className="py-20 border-b border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Trusted by Industry Leaders</p>
        </div>
        <InfinitePartnerLogos
          partners={[
            { name: "PERTAMINA", logo: "/partners/pertamina-partner.png" },
            { name: "PELINDO INDONESIA", logo: "/partners/pelindo-indonesia-partner.png" },
            { name: "PLN Persero", logo: "/partners/pln-persero-partner.jpg" },
            { name: "PT Prasaad Seeds Indonesia", logo: "/partners/pt-prasaad-seeds-indonesia-partner.png" },
            { name: "PT Pura Barutama", logo: "/partners/pt-pura-barutama-partner.png" },
            { name: "RSUP PERSAHABATAN", logo: "/partners/rsup-persahabatan-partner.jpg" },
          ]}
        />
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/30 via-primary/5 to-black border border-primary/20 text-center relative overflow-hidden group">
            <BackgroundGlow variant="primary" size="lg" className="-bottom-20 -right-20 opacity-20 group-hover:opacity-40 transition-opacity" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-7xl font-black font-heading tracking-tight mb-8">
                Elevate Your <span className="text-primary italic">Infrastucture.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Diskusikan kebutuhan engineering Anda dengan tim teknis kami dan dapatkan solusi paling optimal untuk bisnis Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-black font-black text-xl hover:bg-slate-200 transition-all border-none">
                  <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20butuh%20Tim%20Teknis%20mengenai%20infrastruktur." target="_blank">Hubungi Sekarang</Link>
                </Button>
                <Link
                  href={`https://wa.me/6287884241703?text=${encodeURIComponent('Halo PT. Manggala Utama Indonesia, saya tertarik mendiskusikan kebutuhan engineering infrastructure untuk bisnis saya. Mohon info lebih lanjut.')}`}
                  target="_blank"
                  className="font-bold text-lg text-white/70 hover:text-white transition-colors"
                >
                  WhatsApp Support
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Primary FAQ Injection */}
      <FAQSection
        category="general"
        title="Pertanyaan Seputar Layanan & Legalitas PT. Manggala Utama Indonesia"
        subtitle="Temukan jawaban cepat mengenai prosedur, garansi produk, dan kredensial kemitraan kami"
        limit={5}
      />
    </div>
  );
}
