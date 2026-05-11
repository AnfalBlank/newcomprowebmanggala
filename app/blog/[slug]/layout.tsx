import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.manggala-utama.id'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const res = await fetch(`${baseUrl}/api/articles/slug/${slug}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return {
        title: 'Artikel Tidak Ditemukan',
        description: 'Artikel yang Anda cari tidak tersedia.',
      }
    }

    const article = await res.json()

    const title = article.title || 'Artikel Blog'
    const description = article.excerpt || article.content?.slice(0, 160) || 'Baca artikel terbaru dari PT. Manggala Utama Indonesia.'
    const image = article.featuredImage || '/logo.png'

    return {
      title,
      description,
      keywords: article.tags || [],
      authors: article.author ? [{ name: article.author }] : [{ name: 'PT. Manggala Utama Indonesia' }],
      openGraph: {
        title,
        description,
        url: `/blog/${slug}`,
        type: 'article',
        publishedTime: article.publishedDate,
        modifiedTime: article.updatedAt,
        authors: article.author ? [article.author] : ['PT. Manggala Utama Indonesia'],
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
        canonical: `/blog/${slug}`,
      },
    }
  } catch {
    return {
      title: 'Blog | PT. Manggala Utama Indonesia',
      description: 'Baca artikel terbaru dari PT. Manggala Utama Indonesia.',
    }
  }
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
