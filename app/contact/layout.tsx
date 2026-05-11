import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Hubungi PT. Manggala Utama Indonesia untuk konsultasi solusi fueling system, infrastruktur IT, dan engineering. Kami siap membantu kebutuhan bisnis Anda.',
  keywords: [
    'Kontak Manggala Utama', 'Hubungi Kami', 'Konsultasi IT', 'Konsultasi Fueling System',
    'Alamat Kantor', 'Customer Service',
  ],
  openGraph: {
    title: 'Hubungi Kami | PT. Manggala Utama Indonesia',
    description: 'Konsultasikan kebutuhan fueling system, infrastruktur IT, dan engineering Anda bersama tim ahli PT. Manggala Utama Indonesia.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
