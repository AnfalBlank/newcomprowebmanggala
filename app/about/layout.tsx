import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'PT. Manggala Utama Indonesia — perusahaan engineering dan system integrator berpengalaman sejak 2014. Melayani solusi fueling system, infrastruktur IT, dan otomatisasi industri di seluruh Indonesia.',
  keywords: [
    'Tentang Manggala Utama', 'PT Manggala Utama Indonesia', 'Profil Perusahaan',
    'System Integrator Indonesia', 'Engineering Company', 'Sejarah Perusahaan',
  ],
  openGraph: {
    title: 'Tentang Kami | PT. Manggala Utama Indonesia',
    description: 'Perusahaan engineering dan system integrator terpercaya sejak 2014. Berpengalaman dalam fueling system, infrastruktur IT enterprise, dan otomatisasi industri.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
