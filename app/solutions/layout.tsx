import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solusi Kami',
  description: 'Temukan solusi lengkap dari PT. Manggala Utama Indonesia: Fueling System (SPBU & Depo), Infrastruktur IT Enterprise, Otomatisasi Industri, dan Software Development.',
  keywords: [
    'Solusi Fueling System', 'Infrastruktur IT Enterprise', 'Otomatisasi Industri',
    'Software Development Indonesia', 'System Integrator', 'ATG Console', 'Fiber Optic',
    'Pengadaan Server', 'Perangkat Kasir SPBU',
  ],
  openGraph: {
    title: 'Solusi Kami | PT. Manggala Utama Indonesia',
    description: 'Solusi engineering dan IT terpercaya: Fueling System, Infrastruktur IT, Otomatisasi Industri, dan Software Development untuk kebutuhan bisnis Anda.',
    url: '/solutions',
  },
  alternates: {
    canonical: '/solutions',
  },
}

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
