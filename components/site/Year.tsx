import { cacheLife } from 'next/cache'

/** Current year, cached for a day so pages stay static. */
export async function Year() {
  'use cache'
  cacheLife('days')
  return <>{new Date().getFullYear()}</>
}
