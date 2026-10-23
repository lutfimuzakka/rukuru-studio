'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, ViewTransition } from 'react'

const nav = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

/**
 * Full navigation at the top of the page. Once the page scrolls, the links
 * step aside and leave "Start a project" and a Menu button that opens a
 * full-screen menu (after wearemotto.com).
 */
export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 80))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <ViewTransition name="site-header">
      <header
        className={`wrap fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 transition-colors duration-300 ${
          open ? 'text-paper' : 'bg-paper/85 text-ink backdrop-blur-md'
        }`}
      >
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold uppercase leading-[0.95] tracking-[-0.01em]"
          aria-label="Rukuru Studio, home"
        >
          Rukuru
          <br />
          Studio
        </Link>

        <div className="flex items-center gap-3 md:gap-8">
          <nav
            aria-label="Main"
            aria-hidden={scrolled || undefined}
            className={`hidden items-center gap-8 transition-[opacity,transform] duration-300 ease-[var(--ease-out)] md:flex ${
              scrolled || open ? 'pointer-events-none -translate-y-2 opacity-0' : ''
            }`}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={scrolled ? -1 : undefined}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`link pb-0.5 ${isActive(item.href) ? 'text-ultramarine' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className={`hidden rounded-full px-5 py-2.5 transition-colors duration-200 sm:inline-block ${
              open ? 'bg-paper text-ink' : 'bg-ink text-paper hover:bg-ultramarine'
            }`}
          >
            Start a project
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
            className={`rounded-full border px-5 py-2.5 font-medium transition-[opacity,transform,background-color,border-color] duration-300 ease-[var(--ease-out)] ${
              open ? 'border-paper/60' : 'border-ink/25 hover:border-ink'
            } ${scrolled || open ? '' : 'md:pointer-events-none md:hidden'}`}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        hidden={!open}
        className="wrap fixed inset-0 z-40 flex flex-col justify-between bg-ultramarine pt-32 pb-10 text-paper"
      >
        <nav aria-label="Menu" className="flex flex-col">
          {[{ href: '/', label: 'Home' }, ...nav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="t-h1 border-b border-paper/20 py-3 transition-opacity duration-200 hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10 flex flex-wrap justify-between gap-4 text-paper/80">
          <span>Ideas become brands here.</span>
          <Link href="/contact" className="link">
            Start a project
          </Link>
        </div>
      </div>
    </ViewTransition>
  )
}
