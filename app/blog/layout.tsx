import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Berita',
  description: 'Baca artikel terbaru dari PT. Manggala Utama Indonesia: berita perusahaan, update produk, tips teknologi, dan insight industri fueling system & infrastruktur IT.',
  keywords: [
    'Blog Manggala Utama', 'Berita Perusahaan', 'Update Produk', 'Artikel Teknologi',
    'Fueling System News', 'IT Infrastructure', 'Insight Industri',
  ],
  openGraph: {
    title: 'Blog & Berita | PT. Manggala Utama Indonesia',
    description: 'Artikel terbaru seputar fueling system, infrastruktur IT, dan perkembangan industri dari tim PT. Manggala Utama Indonesia.',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
