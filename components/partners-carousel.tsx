'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  initials: string;
  color: string;
}

const partners: Partner[] = [
  { name: "Pertamina", initials: "PRT", color: "from-blue-600 to-red-600" },
  { name: "PLN", initials: "PLN", color: "from-green-600 to-blue-600" },
  { name: "RSUP Persahabatan", initials: "RSUP", color: "from-red-600 to-pink-600" },
  { name: "Pura Barutama", initials: "PURA", color: "from-purple-600 to-indigo-600" },
  { name: "Shell Indonesia", initials: "SHELL", color: "from-yellow-500 to-red-600" },
  { name: "BP Indonesia", initials: "BP", color: "from-green-500 to-yellow-500" },
  { name: "Total Energies", initials: "TOTAL", color: "from-red-600 to-orange-600" },
  { name: "AKR Corpora", initials: "AKR", color: "from-blue-600 to-cyan-600" }
];

export function PartnersCarousel() {
  const [duplicatedPartners, setDuplicatedPartners] = useState<Partner[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Duplicate partners for seamless infinite scroll
    const duplicated = [...partners, ...partners, ...partners];
    setDuplicatedPartners(duplicated);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(var(--primary),0.03)_50%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wide">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-heading px-4">
            Perusahaan yang Telah <span className="gradient-text">Bekerjasama</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Kami bangga dapat dipercaya oleh perusahaan-perusahaan terkemuka di Indonesia
            untuk menyediakan solusi IT dan engineering terbaik
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Fade Edges */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-16 lg:gap-20 animate-marquee"
            style={{
              animation: 'marquee 40s linear infinite'
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Logo Container */}
                <div className="relative h-16 sm:h-20 md:h-24 w-32 sm:w-40 md:w-48 lg:w-56 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-3 sm:p-4 md:p-6 hover:border-primary/50 hover:bg-card/95 transition-all duration-300 hover:shadow-xl flex items-center justify-center">
                  {/* Dummy Logo */}
                  <div className={`w-full h-full bg-gradient-to-br ${partner.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-white font-bold text-lg sm:text-xl md:text-2xl font-heading tracking-tight">
                      {partner.initials}
                    </span>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Partner Name - Show on Hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    {partner.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
          {[
            { value: "50+", label: "Mitra Perusahaan" },
            { value: "10+", label: "Industri Berbeda" },
            { value: "500+", label: "Proyek Sukses" },
            { value: "98%", label: "Kepuasan Klien" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 font-heading">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
