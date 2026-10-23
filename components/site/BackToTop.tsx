'use client'

import type Lenis from 'lenis'

/** Circular "back to top" button, works with or without Lenis smooth scroll. */
export function BackToTop() {
  const toTop = () => {
    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }
  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/30 transition-colors duration-200 hover:border-ultramarine hover:bg-ultramarine hover:text-paper"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  )
}
