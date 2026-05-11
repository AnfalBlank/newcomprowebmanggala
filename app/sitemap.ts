import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.manggala-utama.id'

// Fetch articles from DB for dynamic blog sitemap
async function getArticles() {
  try {
    const res = await fetch(`${baseUrl}/api/articles`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.articles || data || []
  } catch {
    return []
  }
}

// Fetch projects from DB for dynamic portfolio sitemap
async function getProjects() {
  try {
    const res = await fetch(`${baseUrl}/api/projects`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.projects || data || []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects] = await Promise.all([getArticles(), getProjects()])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resource`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = articles.map((article: { slug?: string; updatedAt?: string; createdAt?: string }) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic portfolio pages
  const portfolioPages: MetadataRoute.Sitemap = projects.map((project: { id?: string; updatedAt?: string; createdAt?: string }) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...portfolioPages]
}
