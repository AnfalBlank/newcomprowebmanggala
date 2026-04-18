'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechPatternWrapper } from "@/components/ui/tech-pattern";
import { TechHero } from "@/components/ui/tech-hero";
import { ServiceCard } from "@/components/service-card";
import { ProcessTimeline } from "@/components/timeline";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { FAQSection } from "@/components/faq-section";
import {
  Fuel,
  Server,
  Network,
  Settings,
  ShoppingCart,
  CheckCircle,
  ShieldCheck,
  Zap,
  Cpu,
  Clock,
  Users,
  Award,
  MessageCircle,
  FileText,
  Rocket,
  Wrench
} from "lucide-react";

const solutions = [
  {
    id: "fueling",
    title: "Fueling & ATG System",
    description: "Sistem otomasi SPBU dan manajemen bahan bakar industri dengan monitoring realtime.",
    icon: Fuel,
    features: [
      "Automatic Tank Gauging (ATG) System",
      "Fuel Management System (FMS)",
      "Pump Controller Integration",
      "Leak Detection & Environmental Compliance",
      "Real-time Inventory Monitoring"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop",
    stats: [
      { label: "Akurasi", value: "99.9%" },
      { label: "Response Time", value: "<1s" }
    ],
    href: "/solutions/fueling"
  },
  {
    id: "integration",
    title: "Integrasi POS, MCU & EDC",
    description: "Solusi pembayaran terpusat dan kontrol dispenser otomatis untuk operasional efisien.",
    icon: Server,
    features: [
      "Point of Sales (POS) System Integration",
      "Master Control Unit (MCU) Configuration",
      "EDC Payment Gateway Integration",
      "Forecourt Controller System",
      "Loyalty Program Management"
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=1000&auto=format&fit=crop",
    stats: [
      { label: "Payment Types", value: "50+" },
      { label: "Uptime", value: "99.9%" }
    ],
    href: "/solutions/integration"
  },
  {
    id: "network",
    title: "Infrastruktur Jaringan",
    description: "Desain dan instalasi jaringan data handal untuk lingkungan industri dengan keamanan enterprise.",
    icon: Network,
    features: [
      "Industrial LAN/WAN Network Design",
      "Fiber Optic Cabling & Termination",
      "Wireless Network Solution (Industrial WiFi)",
      "Network Security & Firewall Implementation",
      "VPN & Remote Access Solution"
    ],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?w=1000&auto=format&fit=crop",
    stats: [
      { label: "Speed", value: "10 Gbps" },
      { label: "Coverage", value: "99%" }
    ],
    href: "/solutions/network"
  },
  {
    id: "procurement",
    title: "Pengadaan Perangkat IT",
    description: "Supply hardware IT dan perangkat jaringan sesuai spesifikasi teknis dengan garansi resmi.",
    icon: ShoppingCart,
    features: [
      "Server, Storage & Virtualization",
      "Workstation & Industrial PC Procurement",
      "Network Devices (Switch, Router, Access Point)",
      "Software Licensing & Subscription",
      "Peripheral & IoT Devices"
    ],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&auto=format&fit=crop",
    stats: [
      { label: "Brands", value: "100+" },
      { label: "Warranty", value: "3-5 Thn" }
    ],
    href: "/solutions/procurement"
  },
  {
    id: "maintenance",
    title: "Maintenance & SLA",
    description: "Layanan pemeliharaan preventif dan korektif dengan jaminan SLA dan tim teknis siap sedia.",
    icon: Settings,
    features: [
      "Preventive Maintenance Contract",
      "Corrective Maintenance & Troubleshooting",
      "24/7 On-Call Support Service",
      "Spare Part Management & Replacement",
      "Service Level Agreement (SLA) Guarantee"
    ],
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&auto=format&fit=crop",
    stats: [
      { label: "Response", value: "2 Jam" },
      { label: "Satisfaction", value: "98%" }
    ],
    href: "/solutions/maintenance"
  }
];

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: "Standar Keamanan Tinggi",
    description: "Setiap implementasi sistem mengutamakan aspek keselamatan (HSE) dan keamanan data sesuai standar industri."
  },
  {
    icon: Zap,
    title: "Efisiensi Operasional",
    description: "Sistem terintegrasi yang dirancang untuk mengurangi downtime, mencegah kebocoran, dan mengoptimalkan proses bisnis."
  },
  {
    icon: Cpu,
    title: "Teknologi Terkini",
    description: "Menggunakan perangkat dan software terbaru untuk memastikan sistem Anda siap menghadapi tantangan masa depan."
  },
  {
    icon: Clock,
    title: "Respon Cepat 24/7",
    description: "Tim teknis kami siap memberikan dukungan kapanpun Anda membutuhkan dengan jaminan SLA."
  },
  {
    icon: Users,
    title: "Tim Profesional",
    description: "Lebih dari 50 teknisi ahli bersertifikat siap membantu implementasi dan maintenance."
  },
  {
    icon: Award,
    title: "Jaminan Kualitas",
    description: "Setiap proyek dilakukan dengan standar quality control yang ketat untuk hasil terbaik."
  }
];

const processSteps = [
  {
    icon: MessageCircle,
    title: "Konsultasi",
    description: "Diskusi kebutuhan dan analisis sistem yang diinginkan",
    duration: "1-2 Hari"
  },
  {
    icon: FileText,
    title: "Desain & Perencanaan",
    description: "Pembuatan proposal teknis dan perencanaan implementasi",
    duration: "3-5 Hari"
  },
  {
    icon: Wrench,
    title: "Implementasi",
    description: "Instalasi, konfigurasi, dan testing sistem",
    duration: "7-14 Hari"
  },
  {
    icon: Rocket,
    title: "Peluncuran & Support",
    description: "Go-live sistem dan training pengguna",
    duration: "Ongoing"
  }
];

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <TechHero
        badge="Solusi & Layanan"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Solusi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Engineering
            </span>{" "}
            Terintegrasi
          </h1>
        }
        subtitle="Kami menghadirkan solusi teknis komprehensif mulai dari sistem fueling, integrasi pembayaran, hingga infrastruktur IT yang handal untuk mendukung operasional perusahaan Anda."
      >
        <Button size="lg" asChild className="h-14 px-8 rounded-2xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
          <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20butuh%20konsultasi%20layanan%20Engineering%20terintegrasi." target="_blank" className="flex items-center gap-2">
            Konsultasi Gratis <MessageCircle className="w-5 h-5" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10">
          <Link href="#solutions">Lihat Layanan</Link>
        </Button>
      </TechHero>

      {/* Solutions Grid */}
      <section id="solutions" className="py-16 md:py-24 relative">
        <TechPatternWrapper variant="grid" opacity={0.02}>
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-12 md:mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-2">Layanan Kami</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-display">
                  Solusi <span className="gradient-text">Enterprise</span> untuk Bisnis Anda
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                  Pilih layanan yang sesuai dengan kebutuhan bisnis Anda dan pelajari lebih lanjut
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {solutions.map((solution) => (
                <StaggerItem key={solution.id}>
                  <ServiceCard
                    icon={solution.icon}
                    title={solution.title}
                    description={solution.description}
                    features={solution.features}
                    stats={solution.stats}
                    href={solution.href}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </TechPatternWrapper>
      </section>

      {/* FAQ Section */}
      <FAQSection
        category="services"
        title="Pertanyaan Seputar Layanan Kami"
        subtitle="Jawaban untuk pertanyaan yang sering diajukan mengenai implementasi dan layanan kami"
        limit={5}
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
        <TechPatternWrapper variant="wave" opacity={0.05}>
          {/* Content */}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 font-display text-white px-4">
                Siap Mengoptimalkan Infrastruktur IT Anda?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                Tim kami siap membantu menganalisis kebutuhan bisnis Anda dan memberikan solusi yang tepat
                dengan teknologi terkini dan standar enterprise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto px-4">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                >
                  <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20tertarik%20dengan%20solusi%20kalian." target="_blank">Hubungi Kami</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-14 md:h-16 px-8 md:px-10 text-base md:text-lg bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-white backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                >
                  <Link
                    href={`https://wa.me/6287884241703?text=${encodeURIComponent('Halo PT. Manggala Utama Indonesia, saya ingin konsultasi mengenai solusi teknis yang tepat untuk kebutuhan proyek saya. Bisa dibantu?')}`}
                    target="_blank"
                  >
                    WhatsApp Sekarang
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </TechPatternWrapper>
      </section>
      {/* FAQ Section */}
      <FAQSection
        category="solutions"
        title="Pertanyaan Seputar Layanan Solusi"
        subtitle="Informasi lengkap mengenai metode instalasi, biaya, dan scope pekerjaan."
        limit={5}
      />
    </div>
  );
}
