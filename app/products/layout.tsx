import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produk',
  description: 'Katalog produk PT. Manggala Utama Indonesia: perangkat fueling system, ATG console, perangkat kasir SPBU, server enterprise, dan solusi infrastruktur IT terlengkap.',
  keywords: [
    'Produk Manggala Utama', 'ATG Console', 'Perangkat Kasir SPBU', 'Server Enterprise',
    'Fueling Equipment', 'Infrastruktur IT', 'Katalog Produk', 'Pengadaan IT',
  ],
  openGraph: {
    title: 'Produk | PT. Manggala Utama Indonesia',
    description: 'Katalog lengkap produk fueling system, infrastruktur IT, dan perangkat industri dari PT. Manggala Utama Indonesia.',
    url: '/products',
  },
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
