import Link from 'next/link'
import { ViewTransition } from 'react'
import type { Project } from '@/lib/content'
import { Media } from './Media'

/** Cover + title. The cover morphs into the case study hero on navigation. */
export function ProjectCard({ project, sizes, priority = false }: { project: Project; sizes: string; priority?: boolean }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block" data-cursor="View">
      <div className="overflow-hidden">
        <ViewTransition name={`project-${project.slug}`} share="morph">
          <div className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
            <Media media={project.cardMedia} sizes={sizes} priority={priority} />
          </div>
        </ViewTransition>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="t-h3">
          <span className="link">{project.client}</span>
        </h3>
        <span className="t-small text-stone">{project.year}</span>
      </div>
      <p className="mt-1 text-stone">{project.summary}</p>
    </Link>
  )
}
