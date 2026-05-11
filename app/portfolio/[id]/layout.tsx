import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.manggala-utama.id'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  try {
    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return {
        title: 'Proyek Tidak Ditemukan',
        description: 'Proyek yang Anda cari tidak tersedia.',
      }
    }

    const project = await res.json()

    const title = project.title || 'Detail Proyek'
    const description = project.description?.slice(0, 160) || 'Lihat detail proyek PT. Manggala Utama Indonesia.'
    const image = project.imageUrl || '/logo.png'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/portfolio/${id}`,
        type: 'article',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      alternates: {
        canonical: `/portfolio/${id}`,
      },
    }
  } catch {
    return {
      title: 'Portfolio | PT. Manggala Utama Indonesia',
      description: 'Portofolio proyek PT. Manggala Utama Indonesia.',
    }
  }
}

export default function PortfolioIdLayout({ children }: { children: React.ReactNode }) {
  return children
}
