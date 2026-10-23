'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from '@/components/motion/gsap'
import type { Project } from '@/lib/content'
import { Media } from './Media'
import { ProjectCard } from './ProjectCard'

const FILTERS = ['All', 'Strategy', 'Identity', 'Content', 'Campaign']

/** Grid or list of all projects, filterable by service. In the list, the cover follows the cursor. */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [hovered, setHovered] = useState<Project | null>(null)
  const preview = useRef<HTMLDivElement>(null)

  const shown = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.services.includes(filter))), [projects, filter])

  useEffect(() => {
    if (view !== 'list' || !preview.current) return
    const el = preview.current
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      x(e.clientX + 24)
      y(e.clientY - 120)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [view])

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div role="group" aria-label="Filter by service" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 transition-colors duration-200 ${
                filter === f ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Layout" className="flex gap-4 text-stone">
          {(['grid', 'list'] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={view === v ? 'text-ink' : 'link'}>
              {v === 'grid' ? 'Grid' : 'List'}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 && (
        <p className="mt-16 t-lead text-stone">
          No {filter.toLowerCase()} projects yet.{' '}
          <button type="button" className="link text-ink" onClick={() => setFilter('All')}>
            Show all work
          </button>
        </p>
      )}

      {view === 'grid' ? (
        <div className="mt-12 grid gap-x-[var(--gutter)] gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      ) : (
        <>
          <ul className="mt-4" onPointerLeave={() => setHovered(null)}>
            {shown.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/work/${p.slug}`}
                  onPointerEnter={() => setHovered(p)}
                  onFocus={() => setHovered(p)}
                  className="group grid grid-cols-12 items-baseline gap-4 py-6"
                >
                  <span className="t-h1 col-span-12 transition-colors duration-200 group-hover:text-ultramarine md:col-span-7">{p.client}</span>
                  <span className="col-span-8 text-stone md:col-span-3">{p.services.join(', ')}</span>
                  <span className="col-span-4 text-right text-stone md:col-span-2">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div
            ref={preview}
            aria-hidden
            className={`pointer-events-none fixed top-0 left-0 z-30 hidden w-[22vw] transition-opacity duration-300 md:block ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {hovered && <Media media={hovered.cardMedia} sizes="22vw" />}
          </div>
        </>
      )}
    </>
  )
}
