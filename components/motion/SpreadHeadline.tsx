'use client'

import { useLayoutEffect, useRef, type ElementType } from 'react'
import { gsap, motion, prefersReducedMotion, ScrollTrigger } from './gsap'

type Props = {
  /** One array of words per line. Words are pushed to the edges of the line; a single word sits on the right. */
  lines: string[][]
  as?: ElementType
  className?: string
  /**
   * enter: words rise from a mask on load (hero).
   * scrub: words start gathered in the middle of their line and spread
   * to the edges as the heading scrolls up the screen.
   */
  mode?: 'enter' | 'scrub'
}

export function SpreadHeadline({ lines, as: Tag = 'h2', className = '', mode = 'scrub' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))

    const ctx = gsap.context(() => {
      if (mode === 'enter') {
        gsap.from(words, { yPercent: 110, duration: motion.slow, ease: motion.ease, stagger: motion.stagger })
        return
      }
      // Start position: the line's words set as a normal sentence, centred.
      // Each word then travels out to its spread position, so nothing overlaps.
      // Layout values (offsetLeft/offsetWidth) ignore transforms, so this can
      // be re-measured on refresh without resetting the animation.
      const startOffset = (w: HTMLElement) => {
        const lineEl = w.closest<HTMLElement>('[data-line]')!
        const lineWords = Array.from(lineEl.querySelectorAll<HTMLElement>('[data-word]'))
        const gap = parseFloat(getComputedStyle(lineEl).fontSize) * 0.3
        const widths = lineWords.map((lw) => lw.offsetWidth)
        const total = widths.reduce((a, b) => a + b, 0) + gap * (lineWords.length - 1)
        const i = lineWords.indexOf(w)
        const naturalLeft = (lineEl.offsetWidth - total) / 2 + widths.slice(0, i).reduce((a, b) => a + b, 0) + gap * i
        return naturalLeft - (w.offsetLeft - lineEl.offsetLeft)
      }
      words.forEach((w) => {
        gsap.fromTo(
          w,
          { x: () => startOffset(w) },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: 0.6, invalidateOnRefresh: true },
          },
        )
      })
    }, el)

    return () => ctx.revert()
  }, [mode])

  // Re-measure once web fonts have loaded, since word widths change.
  useLayoutEffect(() => {
    if (mode !== 'scrub' || typeof document === 'undefined') return
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [mode])

  return (
    <Tag ref={ref} className={`uppercase ${className}`} aria-label={lines.map((l) => l.join(' ')).join(' ')}>
      {lines.map((words, i) => (
        <span
          key={i}
          data-line
          aria-hidden
          className={`flex gap-[0.3em] ${words.length === 1 ? 'justify-end' : 'justify-between'}`}
        >
          {words.map((w, j) =>
            mode === 'enter' ? (
              <span key={j} className="line-mask inline-block">
                <span data-word className="inline-block">
                  {w}
                </span>
              </span>
            ) : (
              <span key={j} data-word className="inline-block will-change-transform">
                {w}
              </span>
            ),
          )}
        </span>
      ))}
    </Tag>
  )
}
