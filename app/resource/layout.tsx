import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resource & Dokumen',
  description: 'Unduh resource, dokumen teknis, brosur produk, dan panduan dari PT. Manggala Utama Indonesia untuk kebutuhan referensi Anda.',
  keywords: [
    'Resource Manggala Utama', 'Dokumen Teknis', 'Brosur Produk', 'Download',
    'Panduan Teknis', 'Spesifikasi Produk',
  ],
  openGraph: {
    title: 'Resource & Dokumen | PT. Manggala Utama Indonesia',
    description: 'Akses dokumen teknis, brosur, dan resource dari PT. Manggala Utama Indonesia.',
    url: '/resource',
  },
  alternates: {
    canonical: '/resource',
  },
}

export default function ResourceLayout({ children }: { children: React.ReactNode }) {
  return children
}
