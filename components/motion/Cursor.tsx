'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { gsap } from './gsap'

/**
 * Small ultramarine dot that grows into a label over anything with
 * data-cursor="View" (or any word). Fine pointers only.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => setLabel(null), [pathname])

  useEffect(() => {
    if (!enabled || !dot.current) return
    const el = dot.current
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      x(e.clientX)
      y(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
      setLabel(target?.dataset.cursor ?? null)
    }
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 })
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 })
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    document.documentElement.addEventListener('pointerenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.removeEventListener('pointerenter', enter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="flex items-center justify-center rounded-full bg-ultramarine text-paper font-semibold transition-[width,height] duration-300 ease-[var(--ease-out)]"
        style={{ width: label ? 88 : 10, height: label ? 88 : 10, fontSize: 15 }}
      >
        <span className={`transition-opacity duration-200 ${label ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
      </div>
    </div>
  )
}
