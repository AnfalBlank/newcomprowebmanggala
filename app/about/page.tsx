'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TechPatternWrapper } from "@/components/ui/tech-pattern";
import { TechHero } from "@/components/ui/tech-hero";
import { Timeline } from "@/components/timeline";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Trophy, Target, History, ChevronRight, Award, Shield, CheckCircle, Users, Briefcase, Lightbulb, Clock, Star, MapPin } from "lucide-react";
import { FAQSection } from "@/components/faq-section";
import { PartnerLogos } from "@/components/partner-logos";

export default function AboutPage() {
  const companyMilestones = [
    {
      year: "2014",
      title: "Pendirian Perusahaan",
      description: "PT. Manggala Utama Indonesia didirikan dengan fokus pada solusi IT dan engineering",
      details: [
        "Dimulai dengan tim 5 profesional",
        "Fokus pada integrasi sistem SPBU",
        "Klien pertama di sektor energi"
      ]
    },
    {
      year: "2016",
      title: "Ekspansi Layanan",
      description: "Perluasan portofolio layanan ke infrastruktur jaringan dan pengadaan IT",
      details: [
        "Penambahan divisi jaringan",
        "Kerjasama dengan vendor internasional",
        "Proyek ke-50 selesai"
      ]
    },
    {
      year: "2018",
      title: "Sertifikasi ISO",
      description: "Achievement ISO 9001:2015 certification untuk quality management",
      details: [
        "ISO 9001:2015 certified",
        "Standardisasi proses operasional",
        "Peningkatan kualitas layanan"
      ]
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Digitalisasi layanan dan pengembangan solusi software in-house",
      details: [
        "Luncuran software custom",
        "Integrasi cloud solutions",
        "Penerapan IoT industri"
      ]
    },
    {
      year: "2022",
      title: "Ekspansi Nasional",
      description: "Melayani klien di seluruh Indonesia dengan 5 kantor cabang",
      details: [
        "Kantor cabang di 5 kota besar",
        "Tim teknis 50+ ahli",
        "Proyek ke-500 selesai"
      ]
    },
    {
      year: "2024",
      title: "Innovation Leader",
      description: "Menjadi leader dalam solusi fueling system dan IT integration",
      details: [
        "Market leader SPBU automation",
        "Penghargaan Best IT Integrator",
        "500+ proyek sukses"
      ]
    }
  ];

  const leadershipTeam = [
    {
      name: "Budi Santoso",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop",
      expertise: "20+ tahun experience di IT & Engineering"
    },
    {
      name: "Ahmad Rahman",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop",
      expertise: "15+ tahun experience di Software Development"
    },
    {
      name: "Dewi Lestari",
      role: "COO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop",
      expertise: "18+ tahun experience di Operations Management"
    },
    {
      name: "Rudi Hartono",
      role: "Head of Engineering",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop",
      expertise: "12+ tahun experience di System Integration"
    }
  ];

  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management System",
      icon: Shield
    },
    {
      name: "ISO 27001:2013",
      description: "Information Security Management",
      icon: Shield
    },
    {
      name: "Cisco CCNP",
      description: "Network Professional Certification",
      icon: Award
    },
    {
      name: "Microsoft Gold",
      description: "Gold Partner Status",
      icon: Star
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Professionalisme",
      description: "Kami menjunjung tinggi standar profesional dalam setiap aspek pekerjaan."
    },
    {
      icon: Briefcase,
      title: "Integritas",
      description: "Kejujuran dan transparansi adalah fondasi bisnis kami."
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description: "Kami percaya hasil terbaik dicapai melalui kerjasama tim yang solid."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <TechHero
        badge="Since 2014 — Indonesia"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Mitra Terpercaya untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Solusi IT Enterprise
            </span>
          </h1>
        }
        subtitle="PT. Manggala Utama Indonesia — System Integrator & Engineering Solutions berpengalaman lebih dari 10 tahun."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-4">
          {[
            { value: "10+", label: "Tahun Pengalaman" },
            { value: "500+", label: "Proyek Sukses" },
            { value: "50+", label: "Teknisi Ahli" },
            { value: "24/7", label: "Dukungan Teknis" }
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl font-black font-heading text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </TechHero>

      {/* Profile Section */}
      <section className="py-16 md:py-24 relative">
        <TechPatternWrapper variant="grid" opacity={0.02}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <SlideIn direction="left" className="lg:w-1/2">
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&auto=format&fit=crop"
                    alt="Team Meeting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>
              </SlideIn>

              <SlideIn direction="right" className="lg:w-1/2">
                <Badge variant="outline" className="mb-6 px-4 py-2">Profil Perusahaan</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading">
                  Partner <span className="gradient-text">Terpercaya</span> untuk Solusi IT Anda
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  PT. Manggala Utama Indonesia adalah perusahaan yang didirikan pada tahun 2014,
                  berfokus pada dua bidang utama, Teknologi Informasi dan Pembuatan/Pengembangan Software.
                  Dalam perjalanan kami, kami telah sukses menjadi penyedia solusi IT yang dapat diandalkan di Indonesia.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Kami memiliki spesialisasi dalam sistem fueling, integrasi POS dan MCU, infrastruktur
                  jaringan industri, serta pengadaan perangkat IT. Dengan tim ahli yang berpengalaman,
                  kami berkomitmen untuk menghadirkan solusi yang canggih dan efektif.
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "10+ Tahun", sub: "Pengalaman" },
                    { label: "50+", sub: "Ahli Teknis" },
                    { label: "500+", sub: "Proyek Sukses" }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50"
                    >
                      <div className="text-3xl font-bold text-primary mb-1">{stat.label}</div>
                      <p className="text-sm text-muted-foreground">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                <Button size="lg" asChild className="h-14 px-8 bg-primary hover:bg-primary/90">
                  <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20butuh%20konsultasi%20mengenai%20layanan%20Anda." target="_blank">Hubungi Kami</Link>
                </Button>
              </SlideIn>
            </div>
          </div>
        </TechPatternWrapper>
      </section>

      {/* Company Timeline */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background relative">
        <TechPatternWrapper variant="dots" opacity={0.03}>
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-2">Perjalanan Kami</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                  Timeline <span className="gradient-text">Perusahaan</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Perjalanan PT. Manggala Utama Indonesia dari startup kecil hingga menjadi leader
                  dalam solusi IT dan system integration di Indonesia
                </p>
              </div>
            </FadeIn>

            <div className="max-w-4xl mx-auto">
              <Timeline items={companyMilestones} orientation="left" />
            </div>
          </div>
        </TechPatternWrapper>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 relative">
        <TechPatternWrapper variant="network" opacity={0.02}>
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-2">Tujuan Kami</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                  Visi & <span className="gradient-text">Misi</span>
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <SlideIn direction="left">
                <Card variant="tech" className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                        <Target className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-heading">Visi Kami</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Menjadi perusahaan engineering dan system integrator terdepan di Indonesia yang
                      dikenal karena kualitas, inovasi, dan komitmen terhadap kepuasan pelanggan dalam
                      setiap proyek yang kami tangani.
                    </p>
                  </CardContent>
                </Card>
              </SlideIn>

              <SlideIn direction="right">
                <Card variant="tech" className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                        <Lightbulb className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold font-heading">Misi Kami</h3>
                    </div>
                    <ul className="space-y-4 text-muted-foreground">
                      {[
                        "Menyediakan solusi teknis yang handal dan efisien sesuai kebutuhan spesifik klien.",
                        "Mengedepankan standar keselamatan dan kualitas tertinggi dalam setiap implementasi.",
                        "Membangun hubungan jangka panjang dengan klien melalui layanan purna jual yang responsif."
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </TechPatternWrapper>
      </section>

      {/* Company Values */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 relative">
        <TechPatternWrapper variant="grid" opacity={0.02}>
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-2">Nilai Kami</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                  Nilai <span className="gradient-text">Perusahaan</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Nilai-nilai yang membimbing setiap tindakan dan keputusan kami
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <StaggerItem key={index}>
                  <Card variant="glass" className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/50">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-6">
                        <value.icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-heading">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </TechPatternWrapper>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background relative">
        <TechPatternWrapper variant="dots" opacity={0.03}>
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 px-4 py-2">Sertifikasi</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                  Sertifikasi & <span className="gradient-text">Penghargaan</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Bukti komitmen kami terhadap kualitas dan keunggulan
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {certifications.map((cert, index) => (
                <StaggerItem key={index}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card variant="glass" className="text-center h-full">
                      <CardContent className="p-8">
                        <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-6">
                          <cert.icon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-heading">{cert.name}</h3>
                        <p className="text-muted-foreground text-sm">{cert.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </TechPatternWrapper>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
        <TechPatternWrapper variant="wave" opacity={0.05}>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-white">
                Bergabung dengan Tim Kami
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                Mari bersama-sama menciptakan solusi inovatif untuk masa depan teknologi Indonesia
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="h-14 px-8 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20butuh%20konsultasi%20mengenai%20layanan%20Anda." target="_blank">Hubungi Kami</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-14 px-8 text-lg bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-white backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href="/portfolio">Lihat Portfolio</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </TechPatternWrapper>
      </section>

      {/* Partner Logos Section */}
      <PartnerLogos
        partners={[
          { name: "PERTAMINA", logo: "/partners/pertamina-partner.png" },
          { name: "PELINDO INDONESIA", logo: "/partners/pelindo-indonesia-partner.png" },
          { name: "PLN Persero", logo: "/partners/pln-persero-partner.png" },
          { name: "PT Prasaad Seeds Indonesia", logo: "/partners/pt-prasaad-seeds-indonesia-partner.png" },
          { name: "PT Pura Barutama", logo: "/partners/purabarutama-partner.png" },
          { name: "RSUP PERSAHABATAN", logo: "/partners/rsup-persahabatan-partner.png" },
        ]}
        title="Perusahaan yang Percaya pada Kami"
        subtitle="Kami bangga bekerja sama dengan berbagai perusahaan ternama di Indonesia"
      />
      {/* FAQ Section */}
      <FAQSection
        category="about"
        title="Pertanyaan Seputar Perusahaan Kami"
        subtitle="Mengenal lebih dekat PT. Manggala Utama Indonesia dan komitmen kami kepada pelanggan."
        limit={5}
      />
    </div>
  );
}
