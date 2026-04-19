"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface PartnerLogo {
  name: string
  logo: string
  link?: string
}

interface PartnerLogosProps {
  partners: PartnerLogo[]
  title?: string
  subtitle?: string
  className?: string
}

export function PartnerLogos({ partners, title, subtitle, className }: PartnerLogosProps) {
  return (
    <section className={`py-16 md:py-24 bg-background ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading text-foreground tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-10 items-center justify-items-center">
          {partners.map((partner, index) => (
            <LogoItem key={index} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Premium Infinite Marquee — single track, frameless logos, large size
export function InfinitePartnerLogos({ partners }: { partners: PartnerLogo[] }) {
  const tripled = [...partners, ...partners, ...partners]

  return (
    <section className="overflow-hidden relative">
      {/* Ambient line dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="py-12">
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-24 items-center shrink-0 min-w-full"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {tripled.map((partner, index) => (
              <LogoItem key={`r1-${index}`} partner={partner} frameless />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}

// Reusable logo item — frameless or framed
function LogoItem({
  partner,
  index = 0,
  frameless = false,
}: {
  partner: PartnerLogo
  index?: number
  frameless?: boolean
}) {
  const imageEl = (
    <motion.div
      initial={frameless ? undefined : { opacity: 0, y: 16 }}
      whileInView={frameless ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={frameless ? undefined : { duration: 0.4, delay: index * 0.07 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className={
        frameless
          ? "relative flex-shrink-0 w-44 h-16 md:w-56 md:h-24 cursor-pointer group"
          : "relative w-full h-16 md:h-24 group cursor-pointer"
      }
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        unoptimized
        className="object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        sizes={frameless ? "224px" : "(max-width: 768px) 176px, 224px"}
      />
    </motion.div>
  )

  if (partner.link) {
    return (
      <Link href={partner.link} target="_blank" rel="noopener noreferrer" title={partner.name}>
        {imageEl}
      </Link>
    )
  }
  return imageEl
}
