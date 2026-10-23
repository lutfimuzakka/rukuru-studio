'use client'

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, motion, prefersReducedMotion, SplitText } from './gsap'

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
  /** lines: headings rise line by line from a mask. fade: paragraphs. media: images uncover from the bottom. */
  variant?: 'lines' | 'fade' | 'media'
  delay?: number
  /** Play on mount instead of on scroll (hero). */
  immediate?: boolean
}

/**
 * Scroll-triggered reveal. Content is fully visible without JavaScript and
 * with reduced motion; the animation is only a layer on top.
 */
export function Reveal({ as: Tag = 'div', className, children, variant = 'fade', delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const scrollTrigger = immediate ? undefined : { trigger: el, start: 'top 88%', once: true }
    let split: SplitText | undefined

    const ctx = gsap.context(() => {
      if (variant === 'lines') {
        split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true })
        // Give descenders (g, y, p) room inside the clipping mask.
        gsap.set(split.masks, { paddingBottom: '0.14em', marginBottom: '-0.14em' })
        gsap.from(split.lines, {
          yPercent: 110,
          duration: motion.slow,
          ease: motion.ease,
          stagger: motion.stagger,
          delay,
          scrollTrigger,
        })
      } else if (variant === 'media') {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: motion.slow, ease: motion.ease, delay, scrollTrigger },
        )
        const inner = el.firstElementChild
        if (inner) gsap.from(inner, { scale: 1.1, duration: motion.slow * 1.4, ease: motion.ease, delay, scrollTrigger })
      } else {
        gsap.from(el, { y: 16, opacity: 0, duration: motion.base, ease: motion.ease, delay, scrollTrigger })
      }
    }, el)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [variant, delay, immediate])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
