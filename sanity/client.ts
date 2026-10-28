import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, sanityEnabled } from './env'

// useCdn is off so a page rebuilt right after publishing reads the newest content,
// not Sanity's CDN copy. The site's own cache keeps traffic to Sanity low.
export const client = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null
