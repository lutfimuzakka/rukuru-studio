export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2026-10-01'

/** True once a Sanity project is configured. Until then the site uses lib/content/placeholder.ts. */
export const sanityEnabled = projectId.length > 0
