import { cacheLife, cacheTag } from 'next/cache'
import { defineQuery } from 'next-sanity'
import { client } from '@/sanity/client'
import * as local from './placeholder'
import type { Project, Service, SiteSettings, TeamMember } from './types'

export type * from './types'

// Every reader below returns local placeholder content until Sanity is configured.
// Results are cached and tagged 'content'; a Sanity webhook can call revalidateTag('content').

// Placeholders show locally and on preview links, never on the production deployment
// (Vercel sets VERCEL_ENV=production there). SHOW_PLACEHOLDERS=true/false overrides it.
const showPlaceholders = process.env.SHOW_PLACEHOLDERS
  ? process.env.SHOW_PLACEHOLDERS === 'true'
  : process.env.VERCEL_ENV !== 'production'

const MEDIA = `{
  "src": image.asset->url,
  "video": videoUrl,
  alt,
  "ratio": coalesce(image.asset->metadata.dimensions.aspectRatio, 16/9),
  "tone": image.asset->metadata.palette.muted.background
}`

const PROJECT = `{
  "slug": slug.current, title, client, year, services, industry, summary,
  "accent": coalesce(accent, "#3A2EFF"),
  "heroMedia": heroMedia${MEDIA}, "cardMedia": cardMedia${MEDIA}, hoverVideo,
  challenge, approach, solution, results, testimonial,
  "sections": sections[]{
    ..., _type, _key,
    _type == "fullMedia" => { "media": media${MEDIA} },
    _type == "twoUp" => { "left": left${MEDIA}, "right": right${MEDIA} },
    _type == "grid" => { "items": items[]${MEDIA} }
  },
  "featured": coalesce(featured, false), "order": coalesce(order, 99),
  "isPlaceholder": coalesce(isPlaceholder, false)
}`

const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | order(order asc) ${PROJECT}`)
const SERVICES_QUERY = defineQuery(
  `*[_type == "service"] | order(order asc){ "slug": slug.current, title, description, deliverables, "relatedProjects": relatedProjects[]->slug.current, order }`,
)
const TEAM_QUERY = defineQuery(`*[_type == "teamMember"] | order(order asc){ name, role, "photo": photo${MEDIA}, bio }`)
const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]`)

function visible(projects: Project[]) {
  if (showPlaceholders) return projects
  const real = projects.filter((p) => !p.isPlaceholder)
  // While every case study is still a placeholder, show them so Work is never empty.
  // As soon as one real case study exists, placeholders disappear from production.
  return real.length ? real : projects
}

async function cached() {
  'use cache'
  cacheTag('content')
  cacheLife('hours')
  if (!client) {
    return { projects: local.projects, services: local.services, team: local.team, settings: local.settings }
  }
  const [projects, services, team, settings] = await Promise.all([
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<Service[]>(SERVICES_QUERY),
    client.fetch<TeamMember[]>(TEAM_QUERY),
    client.fetch<Partial<SiteSettings> | null>(SETTINGS_QUERY),
  ])
  return {
    // An empty Sanity dataset falls back to the local placeholder case studies.
    projects: projects.length ? projects : local.projects,
    services: services.length ? services : local.services,
    team,
    // Fields missing in Sanity fall back to the local defaults.
    settings: { ...local.settings, ...(settings ?? {}) } as SiteSettings,
  }
}

export async function getProjects(): Promise<Project[]> {
  return visible((await cached()).projects)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects()
  const featured = all.filter((p) => p.featured)
  return (featured.length ? featured : all).slice(0, 6)
}

export async function getProject(slug: string) {
  const all = await getProjects()
  const index = all.findIndex((p) => p.slug === slug)
  if (index === -1) return null
  return { project: all[index], next: all[(index + 1) % all.length] }
}

export async function getServices(): Promise<Service[]> {
  return (await cached()).services
}

export async function getTeam(): Promise<TeamMember[]> {
  return (await cached()).team
}

export async function getSettings(): Promise<SiteSettings> {
  return (await cached()).settings
}
