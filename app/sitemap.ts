import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/content'

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://rukurustudio.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  const pages = ['', '/work', '/services', '/about', '/contact'].map((p) => ({ url: `${base}${p}` }))
  return [...pages, ...projects.map((p) => ({ url: `${base}/work/${p.slug}` }))]
}
