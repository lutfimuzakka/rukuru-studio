'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/components/motion/gsap'
import { SpreadHeadline } from '@/components/motion/SpreadHeadline'
import type { Media as MediaType } from '@/lib/content'
import { Media } from './Media'

const HEADER = 88 // fixed header height in px
const GAP = 16 // space between a headline line and the opening

/**
 * Home hero, "typographic curtain": the two headline lines start stacked in
 * the middle of the screen. Scrolling pushes IDEAS BECOME to the top edge and
 * BRANDS HERE. to the bottom edge, and the work is uncovered in the opening
 * between them, its edges travelling with the type.
 * With reduced motion the visual simply sits full width under the headline.
 */
export function HeroStage({ intro, media }: { intro: string; media: MediaType }) {
  const stage = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const opening = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(true)

  useEffect(() => setAnimated(!prefersReducedMotion()), [])

  useLayoutEffect(() => {
    if (!animated || !stage.current || !head.current || !opening.current) return
    const headEl = head.current
    const openEl = opening.current
    const [top, bottom] = Array.from(headEl.querySelectorAll<HTMLElement>('[data-line]'))
    if (!top || !bottom) return

    // Everything is measured from layout values (offsetTop/offsetHeight), which
    // ignore transforms, so it stays correct with any font and on every resize.
    const g = { topRest: 0, bottomRest: 0, topFinal: 0, bottomFinal: 0, seam: 0, openTop: 0, openBottom: 0 }
    const measure = () => {
      const vh = window.innerHeight
      const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) || 24
      const headTop = headEl.offsetTop - headEl.offsetHeight / 2 // element is centred with translateY(-50%)
      g.topRest = headTop + top.offsetTop
      g.bottomRest = headTop + bottom.offsetTop
      g.topFinal = HEADER + 8
      g.bottomFinal = vh - gutter - bottom.offsetHeight
      // The seam: halfway between the two resting lines.
      g.seam = (g.topRest + top.offsetHeight + g.bottomRest) / 2
      g.openTop = g.topFinal + top.offsetHeight + GAP
      g.openBottom = g.bottomFinal - GAP
      openEl.style.top = `${g.openTop}px`
      openEl.style.height = `${Math.max(0, g.openBottom - g.openTop)}px`
    }
    measure()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
        },
      })
      // Opening starts as a hairline exactly on the seam and grows with the lines.
      const closed = () => `inset(${g.seam - g.openTop}px 0px ${g.openBottom - g.seam}px 0px)`
      tl.to(copy.current, { opacity: 0, y: 24, ease: 'none', duration: 0.18 }, 0)
        .to(top, { y: () => g.topFinal - g.topRest, duration: 1 }, 0)
        .to(bottom, { y: () => g.bottomFinal - g.bottomRest, duration: 1 }, 0)
        .fromTo(openEl, { clipPath: closed }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1 }, 0)
        .fromTo(openEl.firstElementChild, { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
    }, stage)

    // Re-measure once Adobe Fonts has loaded, since line heights can change.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [animated])

  const headline = (
    <SpreadHeadline
      as="h1"
      mode="enter"
      lines={[
        ['Ideas', 'become'],
        ['brands', 'here.'],
      ]}
      className="t-display max-md:!text-[13vw]"
    />
  )

  if (!animated) {
    return (
      <section className="wrap pt-[6vh]">
        {headline}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-end">
          <p className="t-lead max-w-[34ch]">{intro}</p>
          <Link href="/work" className="link t-h3 w-fit whitespace-nowrap md:justify-self-end">
            See the work
          </Link>
        </div>
        <div className="mt-12">
          <Media media={media} priority />
        </div>
      </section>
    )
  }

  return (
    <div
      ref={stage}
      className="relative -mt-24 h-[180vh] [--hero-fs:13vw] md:h-[240vh] md:[--hero-fs:clamp(3rem,10vw,10.5rem)]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The opening between the two lines; uncovered from its centre. */}
        <div
          ref={opening}
          className="absolute inset-x-[var(--gutter)] overflow-hidden"
          style={{ clipPath: 'inset(50% 0% 50% 0%)' }}
          data-cursor="Work"
        >
          <div className="absolute inset-0 [&>*]:!aspect-auto [&>*]:h-full [&_img]:object-cover">
            <Media media={media} priority sizes="100vw" className="h-full" />
          </div>
        </div>

        {/* Headline, resting in the middle of the screen. */}
        <div ref={head} className="wrap absolute inset-x-0 top-1/2 -translate-y-1/2">
          {headline}
        </div>

        <div
          ref={copy}
          className="wrap absolute inset-x-0 bottom-[var(--gutter)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="t-lead max-w-[30ch]">{intro}</p>
          <div className="flex items-baseline gap-8">
            <Link href="/work" className="link t-h3 whitespace-nowrap">
              See the work
            </Link>
            <span className="hidden text-stone md:inline" aria-hidden>
              (Scroll)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
