'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, motion, prefersReducedMotion } from './gsap'

/** The hero's last line: Simple. → Strategic. → Unforgettable., each rising from a mask. */
export function RotatingWords({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const [reduced, setReduced] = useState(false)
  const word = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setReduced(prefersReducedMotion())
  }, [])

  useEffect(() => {
    if (reduced || words.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [reduced, words.length, interval])

  useLayoutEffect(() => {
    if (!word.current || reduced) return
    gsap.fromTo(word.current, { yPercent: 105 }, { yPercent: 0, duration: motion.slow, ease: motion.ease })
  }, [index, reduced])

  if (reduced) {
    return <span className="block">{words.join(' ')}</span>
  }

  return (
    <span className="line-mask" aria-live="off">
      <span className="sr-only">{words.join(' ')}</span>
      <span ref={word} aria-hidden className="block">
        {words[index]}
      </span>
    </span>
  )
}
