import { Reveal } from '@/components/motion/Reveal'
import { Media } from '@/components/site/Media'
import type { Section } from '@/lib/content'

/** Renders a case study's free-form blocks, in the order set in Sanity. */
export function Sections({ sections }: { sections: Section[] }) {
  return (
    <div className="mt-24 flex flex-col gap-[var(--gutter)] md:mt-32">
      {sections.map((s) => {
        switch (s._type) {
          case 'fullMedia':
            return (
              <figure key={s._key} className="wrap">
                <Reveal variant="media">
                  <Media media={s.media} />
                </Reveal>
                {s.caption && <figcaption className="mt-3 t-small text-stone">{s.caption}</figcaption>}
              </figure>
            )
          case 'twoUp':
            return (
              <div key={s._key} className="wrap grid gap-[var(--gutter)] md:grid-cols-2">
                <Reveal variant="media"><Media media={s.left} sizes="(min-width: 768px) 50vw, 100vw" /></Reveal>
                <Reveal variant="media" delay={0.1}><Media media={s.right} sizes="(min-width: 768px) 50vw, 100vw" /></Reveal>
              </div>
            )
          case 'grid':
            return (
              <div key={s._key} className="wrap grid grid-cols-2 gap-[var(--gutter)] md:grid-cols-3">
                {s.items.map((m, i) => (
                  <Reveal key={i} variant="media" delay={i * 0.06}>
                    <Media media={m} sizes="(min-width: 768px) 33vw, 50vw" />
                  </Reveal>
                ))}
              </div>
            )
          case 'textBlock':
            return (
              <div key={s._key} className="wrap my-16 grid md:grid-cols-12">
                <div className="md:col-span-6 md:col-start-6">
                  {s.heading && <Reveal as="h3" variant="lines" className="t-h2">{s.heading}</Reveal>}
                  <Reveal as="p" className="t-lead measure mt-6 text-ink/80">{s.body}</Reveal>
                </div>
              </div>
            )
          case 'quote':
            return (
              <blockquote key={s._key} className="wrap my-20 md:my-32">
                <Reveal as="p" variant="lines" className="t-h1 max-w-[18ch]">&ldquo;{s.text}&rdquo;</Reveal>
                {s.author && <footer className="mt-6 text-stone">{s.author}</footer>}
              </blockquote>
            )
          case 'stats':
            return (
              <dl key={s._key} className="wrap my-16 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
                {s.items.map((it, i) => (
                  <div key={i}>
                    <dt className="sr-only">{it.label}</dt>
                    <dd className="t-display !text-[clamp(3rem,7vw,6rem)]">{it.value}</dd>
                    <dd className="mt-2 text-stone">{it.label}</dd>
                  </div>
                ))}
              </dl>
            )
          case 'colorPalette':
            return (
              <div key={s._key} className="wrap grid grid-cols-1 gap-[var(--gutter)] sm:grid-cols-3">
                {s.colors.map((c) => (
                  <div key={c.hex} className="flex aspect-[4/3] flex-col justify-end p-5" style={{ background: c.hex, color: isDark(c.hex) ? '#f5f5f2' : '#101014' }}>
                    <span className="t-h3">{c.name}</span>
                    <span className="t-small uppercase opacity-70">{c.hex}</span>
                  </div>
                ))}
              </div>
            )
        }
      })}
    </div>
  )
}

function isDark(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b < 150
}
