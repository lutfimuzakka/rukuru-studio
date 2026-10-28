import Image from 'next/image'
import type { Media as MediaType } from '@/lib/content'

function ratioLabel(r: number) {
  if (!Number.isFinite(r)) return '16:9'
  const known: [number, string][] = [[16 / 9, '16:9'], [4 / 5, '4:5'], [1, '1:1'], [3 / 4, '3:4'], [4 / 3, '4:3'], [3 / 2, '3:2']]
  const hit = known.find(([v]) => Math.abs(v - r) < 0.02)
  return hit ? hit[1] : r.toFixed(2)
}

/**
 * Image, video or — while case studies are being prepared — a tinted block
 * labelled with its ratio, so layouts can be judged before real assets exist.
 */
export function Media({ media, sizes = '100vw', priority = false, className = '' }: { media: MediaType; sizes?: string; priority?: boolean; className?: string }) {
  // Missing or invalid ratio falls back to 16:9 so a page never fails to render.
  const ratio = Number.isFinite(media.ratio) && media.ratio > 0 ? media.ratio : 16 / 9
  const style = { aspectRatio: String(ratio), backgroundColor: media.tone ?? 'var(--lilac)' }

  if (media.video) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        <video className="absolute inset-0 h-full w-full object-cover" src={media.video} autoPlay muted loop playsInline preload="metadata" aria-label={media.alt} />
      </div>
    )
  }

  if (media.src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    )
  }

  return (
    <div role="img" aria-label={media.alt} className={`relative overflow-hidden ${className}`} style={style}>
      <svg className="absolute inset-0 h-full w-full text-ink/10" preserveAspectRatio="none" aria-hidden>
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="absolute bottom-3 left-3 t-small text-ink/55">
        {media.alt} · {ratioLabel(ratio)}
      </span>
    </div>
  )
}
