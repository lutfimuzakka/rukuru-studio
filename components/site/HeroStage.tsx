'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/components/motion/gsap'
import { SpreadHeadline } from '@/components/motion/SpreadHeadline'
import type { Media as MediaType } from '@/lib/content'
import { Media } from './Media'

/**
 * Home hero, after wearemotto.com: a spread headline with a small visual in
 * the corner. Scrolling pins the stage and the visual grows to fill the
 * screen while the headline lifts away. With reduced motion, the visual
 * simply sits full width under the headline.
 */
const HEADER = 88

export function HeroStage({ intro, media }: { intro: string; media: MediaType }) {
  const stage = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(true)

  useEffect(() => setAnimated(!prefersReducedMotion()), [])

  useLayoutEffect(() => {
    if (!animated || !stage.current || !visual.current) return
    const gutter = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter')) || 24
    const targetW = () => {
      const g = gutter()
      return Math.min(window.innerWidth - 2 * g, (window.innerHeight - HEADER - 2 * g) * (16 / 9))
    }
    // Centre the grown visual in the space below the header.
    const targetBottom = () => {
      const h = (targetW() * 9) / 16
      return (window.innerHeight - HEADER - h) / 2
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true },
      })
      tl.to(head.current, { yPercent: -40, opacity: 0, ease: 'none', duration: 0.45 }, 0)
        .to(copy.current, { opacity: 0, y: -24, ease: 'none', duration: 0.25 }, 0)
        .to(
          visual.current,
          {
            width: () => targetW(),
            left: () => (window.innerWidth - targetW()) / 2,
            bottom: () => targetBottom(),
            ease: 'power2.inOut',
            duration: 1,
          },
          0,
        )
    }, stage)
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
    <div ref={stage} className="relative -mt-24 h-[190vh] md:h-[260vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={head} className="wrap pt-[calc(6rem+6vh)]">
          {headline}
        </div>

        <div
          ref={copy}
          className="wrap absolute right-0 bottom-[calc(var(--gutter)*2+110px)] flex max-w-[44rem] flex-col gap-6 md:bottom-[var(--gutter)] md:items-end md:text-right"
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

        <div
          ref={visual}
          className="absolute bottom-[var(--gutter)] left-[var(--gutter)] w-[clamp(180px,24vw,420px)] will-change-[width,left,bottom]"
          data-cursor="Reel"
        >
          <Media media={media} priority sizes="100vw" />
        </div>
      </div>
    </div>
  )
}
