import type { Project, Service, SiteSettings, TeamMember } from './types'

// Local content used until Sanity is connected (no NEXT_PUBLIC_SANITY_PROJECT_ID).
// Every project here is a placeholder: fictional clients, labelled media blocks.
// Replace them from Sanity Studio once the real case studies are ready.

export const settings: SiteSettings = {
  tagline: 'Ideas become brands here.',
  taglineWords: ['Simple.', 'Strategic.', 'Unforgettable.'],
  intro:
    'Rukuru Studio is a branding studio in Malang. We help founders and teams turn an idea into a brand people recognise, remember and choose — from the first strategy session to the last asset.',
  email: 'hello@rukurustudio.com',
  whatsapp: '62881081937959',
  whatsappDisplay: '+62 881 0819 37959',
  city: 'Malang',
  country: 'Indonesia',
  timezone: 'Asia/Jakarta',
  socials: [
    // Add Instagram, Behance and LinkedIn profile links here (or in Sanity).
    { label: 'WhatsApp', href: 'https://wa.me/62881081937959' },
  ],
  about: {
    heading: 'A small studio that thinks before it draws.',
    body: [
      'We started Rukuru because too many good ideas launch with a logo but without a brand. A name, a mark and a colour are only the surface. Underneath sits a decision about who you are for and why anyone should care.',
      'So every project starts with that decision. Once it is clear, the identity, the content and the campaigns follow from it — and stay consistent long after we hand them over.',
    ],
  },
  process: [
    { title: 'Discover', body: 'Workshops, interviews and a look at the market to find what is true and different about you.' },
    { title: 'Define', body: 'A positioning, a voice and a brand idea everyone on your team can repeat in one sentence.' },
    { title: 'Design', body: 'Identity, type, colour, motion and the first real applications, tested on actual touchpoints.' },
    { title: 'Deliver', body: 'Guidelines, templates and launch assets, handed over so your team can keep the brand alive.' },
  ],
}

const tones = {
  p1: { accent: '#3A2EFF', tone: '#DCD9FF' },
  p2: { accent: '#0E8A5F', tone: '#CFEDE0' },
  p3: { accent: '#E0482B', tone: '#F7D7CF' },
}

const m = (alt: string, ratio: number, tone: string) => ({ alt, ratio, tone })

export const projects: Project[] = [
  {
    slug: 'project-01',
    title: 'Project 01',
    client: 'Lereng Coffee Co.',
    year: 2026,
    services: ['Strategy', 'Identity'],
    industry: 'Food & beverage',
    summary: 'A coffee brand from the slopes of Mount Arjuno, made for city mornings.',
    accent: tones.p1.accent,
    heroMedia: m('Placeholder hero image', 16 / 9, tones.p1.tone),
    cardMedia: m('Placeholder cover image', 4 / 5, tones.p1.tone),
    challenge:
      'Placeholder. Describe the situation the client was in: what was not working, what was at stake and what they asked for.',
    approach:
      'Placeholder. Explain how the studio looked at the problem — the research, the insight and the idea the work grew from.',
    solution:
      'Placeholder. Show what was made and why it answers the challenge: the identity, its system and where it lives.',
    sections: [
      { _type: 'fullMedia', _key: 'a', media: m('Placeholder brand overview', 16 / 9, tones.p1.tone), caption: 'Full-width image or video' },
      { _type: 'twoUp', _key: 'b', left: m('Placeholder packaging', 4 / 5, tones.p1.tone), right: m('Placeholder detail', 4 / 5, tones.p1.tone) },
      { _type: 'colorPalette', _key: 'c', colors: [{ name: 'Ultramarine', hex: '#3A2EFF' }, { name: 'Bean', hex: '#2A1E17' }, { name: 'Foam', hex: '#F2EEE6' }] },
      { _type: 'textBlock', _key: 'd', heading: 'A system, not a logo', body: 'Placeholder. Use text blocks between visuals to explain decisions the images cannot.' },
      { _type: 'grid', _key: 'e', items: [m('Placeholder 1', 1, tones.p1.tone), m('Placeholder 2', 1, tones.p1.tone), m('Placeholder 3', 1, tones.p1.tone)] },
    ],
    testimonial: { quote: 'Placeholder for a short, specific quote from the client.', name: 'Client name', role: 'Founder' },
    featured: true,
    order: 1,
    isPlaceholder: true,
  },
  {
    slug: 'project-02',
    title: 'Project 02',
    client: 'Arunika Pay',
    year: 2025,
    services: ['Strategy', 'Identity', 'Content'],
    industry: 'Fintech',
    summary: 'Payments for small shops, with a brand that feels as friendly as the corner warung.',
    accent: tones.p2.accent,
    heroMedia: m('Placeholder hero image', 16 / 9, tones.p2.tone),
    cardMedia: m('Placeholder cover image', 4 / 5, tones.p2.tone),
    challenge: 'Placeholder. Describe the challenge.',
    approach: 'Placeholder. Describe the approach.',
    solution: 'Placeholder. Describe the solution.',
    sections: [
      { _type: 'fullMedia', _key: 'a', media: m('Placeholder app screens', 16 / 9, tones.p2.tone) },
      { _type: 'stats', _key: 'b', items: [{ value: '00', label: 'Placeholder result' }, { value: '00%', label: 'Placeholder result' }] },
      { _type: 'twoUp', _key: 'c', left: m('Placeholder card', 1, tones.p2.tone), right: m('Placeholder poster', 1, tones.p2.tone) },
    ],
    featured: true,
    order: 2,
    isPlaceholder: true,
  },
  {
    slug: 'project-03',
    title: 'Project 03',
    client: 'Kalang Festival',
    year: 2025,
    services: ['Identity', 'Campaign'],
    industry: 'Culture & events',
    summary: 'A music festival identity that moves to the rhythm of its line-up.',
    accent: tones.p3.accent,
    heroMedia: m('Placeholder hero image', 16 / 9, tones.p3.tone),
    cardMedia: m('Placeholder cover image', 4 / 5, tones.p3.tone),
    challenge: 'Placeholder. Describe the challenge.',
    approach: 'Placeholder. Describe the approach.',
    solution: 'Placeholder. Describe the solution.',
    sections: [
      { _type: 'fullMedia', _key: 'a', media: m('Placeholder campaign film', 16 / 9, tones.p3.tone), caption: 'Campaign film' },
      { _type: 'quote', _key: 'b', text: 'Placeholder for a line that sums up the idea behind the work.' },
      { _type: 'grid', _key: 'c', items: [m('Placeholder poster 1', 3 / 4, tones.p3.tone), m('Placeholder poster 2', 3 / 4, tones.p3.tone), m('Placeholder poster 3', 3 / 4, tones.p3.tone)] },
    ],
    featured: true,
    order: 3,
    isPlaceholder: true,
  },
]

export const services: Service[] = [
  {
    slug: 'strategy',
    title: 'Strategy',
    description: 'Positioning, naming and a brand idea that tells your team what to say yes and no to.',
    deliverables: ['Research and workshops', 'Positioning', 'Naming', 'Brand idea and voice'],
    relatedProjects: ['project-01', 'project-02'],
    order: 1,
  },
  {
    slug: 'identity',
    title: 'Identity',
    description: 'Logos, type, colour, motion and the rules that keep them working together everywhere.',
    deliverables: ['Logo and wordmark', 'Visual system', 'Motion identity', 'Brand guidelines'],
    relatedProjects: ['project-01', 'project-03'],
    order: 2,
  },
  {
    slug: 'content',
    title: 'Content',
    description: 'Art direction, photography, social templates and the everyday assets that carry the brand.',
    deliverables: ['Art direction', 'Social content', 'Templates', 'Packaging'],
    relatedProjects: ['project-02'],
    order: 3,
  },
  {
    slug: 'campaign',
    title: 'Campaign',
    description: 'Launches and campaigns that introduce the brand with one clear idea across every channel.',
    deliverables: ['Campaign idea', 'Key visuals', 'Film and motion', 'Launch toolkit'],
    relatedProjects: ['project-03'],
    order: 4,
  },
]

export const team: TeamMember[] = [
  { name: 'Team member', role: 'Founder, creative director' },
  { name: 'Team member', role: 'Brand strategist' },
  { name: 'Team member', role: 'Designer' },
]
