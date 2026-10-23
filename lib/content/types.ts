// Shapes shared by the Sanity queries and the local placeholder content.
// Keep these in sync with sanity/schemaTypes.

export type Media = {
  /** Image URL. Empty for placeholders, which render a labelled block instead. */
  src?: string
  /** Video URL (mp4/webm or a Mux/Cloudinary stream). */
  video?: string
  alt: string
  /** Width / height, e.g. 16/9. Used to reserve space and label placeholders. */
  ratio: number
  /** Background tone for placeholders and while media loads. */
  tone?: string
}

export type Section =
  | { _type: 'fullMedia'; _key: string; media: Media; caption?: string }
  | { _type: 'twoUp'; _key: string; left: Media; right: Media }
  | { _type: 'grid'; _key: string; items: Media[] }
  | { _type: 'textBlock'; _key: string; heading?: string; body: string }
  | { _type: 'quote'; _key: string; text: string; author?: string }
  | { _type: 'stats'; _key: string; items: { value: string; label: string }[] }
  | { _type: 'colorPalette'; _key: string; colors: { name: string; hex: string }[] }

export type Project = {
  slug: string
  title: string
  client: string
  year: number
  services: string[]
  industry: string
  summary: string
  /** Main brand colour of the project, used for its card and hero tone. */
  accent: string
  heroMedia: Media
  cardMedia: Media
  hoverVideo?: string
  challenge: string
  approach: string
  solution: string
  sections: Section[]
  results?: string
  testimonial?: { quote: string; name: string; role: string }
  featured: boolean
  order: number
  /** Placeholder entries never render in production builds. */
  isPlaceholder?: boolean
}

export type Service = {
  slug: string
  title: string
  description: string
  deliverables: string[]
  relatedProjects: string[]
  order: number
}

export type TeamMember = {
  name: string
  role: string
  photo?: Media
  bio?: string
}

export type ProcessStep = { title: string; body: string }

export type SiteSettings = {
  tagline: string
  taglineWords: string[]
  intro: string
  showreel?: Media
  email: string
  whatsapp: string
  whatsappDisplay: string
  city: string
  country: string
  timezone: string
  socials: { label: string; href: string }[]
  about: { heading: string; body: string[] }
  process: ProcessStep[]
}
