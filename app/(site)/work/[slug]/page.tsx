import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { Sections } from '@/components/blocks/Sections'
import { Reveal } from '@/components/motion/Reveal'
import { Media } from '@/components/site/Media'
import { getProject, getProjects } from '@/lib/content'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const data = await getProject(slug)
  if (!data) return {}
  return { title: `${data.project.client}`, description: data.project.summary }
}

export default async function CaseStudyPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const data = await getProject(slug)
  if (!data) notFound()
  const { project, next } = data

  const story = [
    { title: 'Challenge', body: project.challenge },
    { title: 'Approach', body: project.approach },
    { title: 'Solution', body: project.solution },
  ].filter((s) => s.body)

  return (
    <article>
      <header className="wrap pt-[6vh]">
        <Reveal as="h1" variant="lines" immediate className="t-display max-w-[14ch]">
          {project.client}
        </Reveal>
        <Reveal as="p" immediate delay={0.3} className="t-lead measure mt-6 max-w-[40ch]">
          {project.summary}
        </Reveal>
      </header>

      <div className="wrap mt-12">
        <ViewTransition name={`project-${project.slug}`} share="morph">
          <div>
            <Media media={project.heroMedia} priority />
          </div>
        </ViewTransition>
      </div>

      <dl className="wrap mt-10 grid grid-cols-2 gap-6 border-b border-line pb-10 t-small md:grid-cols-4">
        {[
          ['Client', project.client],
          ['Year', String(project.year)],
          ['Services', project.services.join(', ')],
          ['Industry', project.industry],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-stone">{k}</dt>
            <dd className="mt-1 font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="wrap mt-20 flex flex-col gap-16 md:mt-32">
        {story.map((s) => (
          <section key={s.title} className="grid gap-4 md:grid-cols-12">
            <h2 className="t-h3 md:col-span-3">{s.title}</h2>
            <Reveal as="p" className="t-lead measure md:col-span-7 md:col-start-5">
              {s.body}
            </Reveal>
          </section>
        ))}
      </div>

      <Sections sections={project.sections} />

      {project.testimonial && (
        <figure className="wrap mt-24 md:mt-40">
          <Reveal as="blockquote" variant="lines" className="t-h1 max-w-[20ch]">
            &ldquo;{project.testimonial.quote}&rdquo;
          </Reveal>
          <figcaption className="mt-6 text-stone">
            {project.testimonial.name}, {project.testimonial.role}
          </figcaption>
        </figure>
      )}

      {next && next.slug !== project.slug && (
        <Link href={`/work/${next.slug}`} className="group wrap mt-32 block border-t border-line pt-10 md:mt-48" data-cursor="Next">
          <span className="t-small text-stone">Next project</span>
          <span className="t-display mt-2 block transition-colors duration-200 group-hover:text-ultramarine">{next.client}</span>
        </Link>
      )}
    </article>
  )
}
