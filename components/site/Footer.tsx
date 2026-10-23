import Link from 'next/link'
import type { SiteSettings } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { BackToTop } from './BackToTop'
import { Clock } from './Clock'
import { Year } from './Year'

const menu = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="t-h3">{title}</h2>
      <div className="mt-5 flex flex-col gap-1.5 text-[0.95rem]">{children}</div>
    </div>
  )
}

/**
 * Two parts, after orkha.id: a full-bleed ultramarine call to action,
 * then a light four-column footer with a bottom bar.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const wa = `https://wa.me/${settings.whatsapp}`
  return (
    <footer className="mt-32 md:mt-48">
      <Link
        href="/contact"
        className="group wrap block bg-ultramarine py-20 text-center text-paper md:py-28"
        data-cursor="Start"
      >
        <Reveal as="span" variant="lines" className="t-h1 mx-auto block max-w-[16ch]">
          Let&rsquo;s build your brand.
        </Reveal>
        <span className="mt-6 inline-block border-b border-paper/50 pb-0.5 transition-colors duration-200 group-hover:border-paper">
          Start a project
        </span>
      </Link>

      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-3">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold uppercase leading-[0.95] tracking-[-0.01em]"
            aria-label="Rukuru Studio, home"
          >
            Rukuru
            <br />
            Studio
          </Link>
          <p className="mt-5 max-w-[26ch] text-stone">{settings.tagline} Simple. Strategic. Unforgettable.</p>
        </div>

        <div className="lg:col-span-2 lg:col-start-5">
          <Column title="Menu.">
            {menu.map((m) => (
              <Link key={m.href} href={m.href} className="link w-fit">
                {m.label}
              </Link>
            ))}
          </Column>
        </div>

        <div className="order-4 col-span-2 sm:order-none sm:col-span-1 lg:col-span-3">
          <Column title="Contact.">
            <a href={`mailto:${settings.email}`} className="link w-fit">
              {settings.email}
            </a>
            <a href={wa} className="link w-fit">
              {settings.whatsappDisplay}
            </a>
            <span className="mt-3 text-stone">
              {settings.city}, {settings.country}
            </span>
            <span className="text-stone">
              <Clock timezone={settings.timezone} city={settings.city} />
            </span>
          </Column>
        </div>

        <div className="order-3 sm:order-none lg:col-span-2">
          <Column title="Social.">
            {settings.socials.map((s) => (
              <a key={s.label} href={s.href} className="link w-fit" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </Column>
        </div>
      </div>

      <div className="wrap flex items-center justify-between gap-6 border-t border-line py-6 text-[0.9rem] text-stone">
        <span>© <Year /> Rukuru Studio. All rights reserved.</span>
        <BackToTop />
      </div>
    </footer>
  )
}
