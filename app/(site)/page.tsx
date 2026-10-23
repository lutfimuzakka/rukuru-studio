import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { RotatingWords } from '@/components/motion/RotatingWords'
import { Media } from '@/components/site/Media'
import { ProjectCard } from '@/components/site/ProjectCard'
import { getFeaturedProjects, getServices, getSettings } from '@/lib/content'

export default async function HomePage() {
  const [settings, projects, services] = await Promise.all([getSettings(), getFeaturedProjects(), getServices()])

  return (
    <>
      {/* Hero: the one loud moment on the site. */}
      <section className="wrap flex min-h-[calc(100svh-6rem)] flex-col justify-between pb-10">
        <h1 className="t-display mt-[8vh]">
          <Reveal as="span" variant="lines" immediate className="block">
            Ideas become brands here.
          </Reveal>
          <RotatingWords words={settings.taglineWords} />
        </h1>
        <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal as="p" immediate delay={0.4} className="t-lead measure max-w-[34ch]">
            A branding studio in {settings.city}. Strategy, identity, content and campaigns for people with an idea worth remembering.
          </Reveal>
          <Reveal immediate delay={0.55}>
            <Link href="/work" className="link t-h3 w-fit whitespace-nowrap">
              See the work
            </Link>
          </Reveal>
        </div>
      </section>

      {settings.showreel && (
        <section className="wrap" aria-label="Showreel">
          <Reveal variant="media">
            <Media media={settings.showreel} priority />
          </Reveal>
        </section>
      )}

      {/* Selected work: asymmetric two-column rhythm, the first piece largest. */}
      <section className="wrap mt-24 md:mt-40" aria-labelledby="work-heading">
        <div className="flex items-end justify-between gap-6">
          <Reveal as="h2" variant="lines" className="t-h1" >
            <span id="work-heading">Selected work</span>
          </Reveal>
          <Link href="/work" className="link mb-2 shrink-0">All projects</Link>
        </div>
        <div className="mt-12 grid gap-x-[var(--gutter)] gap-y-20 md:grid-cols-12">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              className={
                i % 3 === 0
                  ? 'md:col-span-7'
                  : i % 3 === 1
                    ? 'md:col-span-4 md:col-start-9 md:mt-48'
                    : 'md:col-span-5 md:col-start-3'
              }
            >
              <ProjectCard project={project} sizes="(min-width: 768px) 58vw, 100vw" priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio statement */}
      <section className="wrap mt-32 grid gap-8 md:mt-48 md:grid-cols-12">
        <Reveal as="p" variant="lines" className="t-h2 md:col-span-9 md:col-start-4">
          {settings.intro}
        </Reveal>
      </section>

      {/* Services, as a quiet list. */}
      <section className="wrap mt-32 md:mt-48" aria-labelledby="services-heading">
        <h2 id="services-heading" className="t-small text-stone">What we do</h2>
        <ul className="mt-6 border-t border-line">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`/services#${s.slug}`} className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline">
                <span className="t-h1 transition-colors duration-200 group-hover:text-ultramarine md:col-span-6">{s.title}</span>
                <span className="text-stone md:col-span-5 md:col-start-8">{s.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
