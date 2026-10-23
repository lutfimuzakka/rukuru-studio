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

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <ViewTransition name="site-header">
      <header className={`wrap fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 transition-colors duration-200 ${open ? 'text-paper' : 'bg-paper/85 text-ink backdrop-blur-md'}`}>
        <Link href="/" className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold uppercase leading-[0.95] tracking-[-0.01em]" aria-label="Rukuru Studio, home">
          Rukuru<br />Studio
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`link pb-0.5 ${isActive(item.href) ? 'text-ultramarine' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2.5 text-paper transition-colors duration-200 hover:bg-ultramarine"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-base font-semibold"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="wrap fixed inset-0 z-40 flex flex-col justify-end bg-ultramarine pb-10 text-paper md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {[{ href: '/', label: 'Home' }, ...nav].map((item) => (
            <Link key={item.href} href={item.href} className="t-h1">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </ViewTransition>
  )
}
