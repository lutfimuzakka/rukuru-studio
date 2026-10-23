import Link from 'next/link'
import type { SiteSettings } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { Clock } from './Clock'

export function Footer({ settings }: { settings: SiteSettings }) {
  const wa = `https://wa.me/${settings.whatsapp}`
  return (
    <footer className="wrap mt-32 bg-ink pt-20 pb-8 text-paper md:mt-48">
      <Reveal as="p" variant="lines" className="t-display max-w-[11ch]">
        Let&rsquo;s build your brand.
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-3">
        <a href={wa} className="rounded-full bg-paper px-6 py-3 font-semibold text-ink transition-colors duration-200 hover:bg-ultramarine hover:text-paper">
          Chat on WhatsApp
        </a>
        <a href={`mailto:${settings.email}`} className="rounded-full border border-paper/40 px-6 py-3 font-semibold transition-colors duration-200 hover:border-paper">
          {settings.email}
        </a>
      </div>

      <div className="mt-24 grid gap-8 border-t border-paper/20 pt-8 t-small sm:grid-cols-3">
        <nav aria-label="Footer" className="flex flex-col gap-1">
          <Link href="/work" className="link w-fit">Work</Link>
          <Link href="/services" className="link w-fit">Services</Link>
          <Link href="/about" className="link w-fit">About</Link>
          <Link href="/contact" className="link w-fit">Contact</Link>
        </nav>
        <div className="flex flex-col gap-1">
          {settings.socials.map((s) => (
            <a key={s.label} href={s.href} className="link w-fit" target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-1 text-paper/70 sm:items-end">
          <Clock timezone={settings.timezone} city={settings.city} />
          <span>{settings.city}, {settings.country}</span>
          <span>© Rukuru Studio</span>
        </div>
      </div>
    </footer>
  )
}
