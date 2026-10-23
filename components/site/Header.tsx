'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState, ViewTransition } from 'react'
import { gsap, prefersReducedMotion } from '@/components/motion/gsap'

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

  // Hysteresis: collapse after 120px, expand again above 40px, so the header
  // never flickers when scrolling stops right at the threshold.
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled((was) => (was ? y > 40 : y > 120))
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [])

  const collapsed = scrolled || open
  const navWrap = useRef<HTMLDivElement>(null)
  const menuWrap = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Desktop only: the links fade out right to left while their column closes,
  // and the Menu button opens in the same movement, so nothing jumps.
  useLayoutEffect(() => {
    const navEl = navWrap.current
    const menuEl = menuWrap.current
    if (!navEl || !menuEl) return
    if (!isDesktop) {
      gsap.set(menuEl, { width: 'auto', opacity: 1 })
      return
    }
    const links = navEl.querySelectorAll('[data-navlink]')
    const navW = (navEl.firstElementChild as HTMLElement).scrollWidth
    const menuW = (menuEl.firstElementChild as HTMLElement).scrollWidth
    const instant = first.current || prefersReducedMotion()
    first.current = false
    const d = instant ? 0 : 0.65
    const ease = 'power3.inOut'
    gsap.killTweensOf([navEl, menuEl, links])

    if (collapsed) {
      gsap.to(links, { opacity: 0, y: -6, duration: instant ? 0 : 0.22, ease: 'power2.in', stagger: { each: instant ? 0 : 0.04, from: 'end' } })
      gsap.to(navEl, { width: 0, duration: d, ease, delay: instant ? 0 : 0.08 })
      gsap.to(menuEl, { width: menuW, opacity: 1, duration: d, ease, delay: instant ? 0 : 0.08 })
    } else {
      gsap.to(menuEl, { width: 0, opacity: 0, duration: d, ease })
      gsap.to(navEl, { width: navW, duration: d, ease, onComplete: () => gsap.set(navEl, { width: 'auto' }) })
      gsap.to(links, { opacity: 1, y: 0, duration: instant ? 0 : 0.3, ease: 'power2.out', delay: instant ? 0 : 0.3, stagger: instant ? 0 : 0.04 })
    }
  }, [collapsed, isDesktop])

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

        <div className="flex items-center">
          <div ref={navWrap} className="hidden overflow-hidden md:block">
            <nav aria-label="Main" aria-hidden={collapsed || undefined} className="flex items-center gap-8 whitespace-nowrap pr-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-navlink
                  tabIndex={collapsed ? -1 : undefined}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`link inline-block pb-0.5 ${isActive(item.href) ? 'text-ultramarine' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            href="/contact"
            className={`hidden rounded-full px-5 py-2.5 whitespace-nowrap transition-colors duration-200 sm:inline-block ${
              open ? 'bg-paper text-ink' : 'bg-ink text-paper hover:bg-ultramarine'
            }`}
          >
            Start a project
          </Link>

          <div ref={menuWrap} className="overflow-hidden md:w-0">
            <div className="pl-3">
              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                tabIndex={collapsed || !isDesktop ? undefined : -1}
                onClick={() => setOpen((o) => !o)}
                className={`rounded-full border px-5 py-2.5 font-medium whitespace-nowrap transition-colors duration-200 ${
                  open ? 'border-paper/60' : 'border-ink/25 hover:border-ink'
                }`}
              >
                {open ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>
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
