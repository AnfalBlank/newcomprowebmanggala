import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Pertanyaan yang sering diajukan tentang layanan PT. Manggala Utama Indonesia: fueling system, infrastruktur IT, proses pengadaan, dan dukungan teknis.',
  keywords: [
    'FAQ Manggala Utama', 'Pertanyaan Umum', 'Layanan IT', 'Fueling System FAQ',
    'Dukungan Teknis', 'Pengadaan IT',
  ],
  openGraph: {
    title: 'FAQ | PT. Manggala Utama Indonesia',
    description: 'Temukan jawaban atas pertanyaan umum seputar layanan, produk, dan proses kerja PT. Manggala Utama Indonesia.',
    url: '/faq',
  },
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
