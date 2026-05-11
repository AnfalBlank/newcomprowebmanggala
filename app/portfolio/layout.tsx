import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Lihat portofolio proyek PT. Manggala Utama Indonesia: implementasi fueling system, infrastruktur IT enterprise, otomatisasi industri, dan software development di berbagai industri.',
  keywords: [
    'Portfolio Manggala Utama', 'Proyek Fueling System', 'Implementasi IT',
    'Case Study', 'Referensi Proyek', 'System Integrator Indonesia',
  ],
  openGraph: {
    title: 'Portfolio | PT. Manggala Utama Indonesia',
    description: 'Portofolio proyek unggulan PT. Manggala Utama Indonesia di bidang fueling system, infrastruktur IT, dan otomatisasi industri.',
    url: '/portfolio',
  },
  alternates: {
    canonical: '/portfolio',
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
