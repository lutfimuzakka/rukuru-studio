'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

/** Motion tokens mirrored from app/globals.css (seconds). */
export const motion = {
  ease: 'expo.out',
  easeInOut: 'power3.inOut',
  fast: 0.2,
  base: 0.6,
  slow: 1,
  stagger: 0.06,
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText }
