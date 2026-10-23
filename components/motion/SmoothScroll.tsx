'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from './gsap'

/** Lenis smooth scroll, synced with GSAP's ticker. Off when reduced motion is on. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenis.current = instance
    ;(window as Window & { __lenis?: Lenis }).__lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis.current = null
      delete (window as Window & { __lenis?: Lenis }).__lenis
    }
  }, [])

  // New page starts at the top; refresh triggers once the layout settles.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
