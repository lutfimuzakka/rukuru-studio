import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { SpreadHeadline } from '@/components/motion/SpreadHeadline'
import { HeroStage } from '@/components/site/HeroStage'
import { ProjectCard } from '@/components/site/ProjectCard'
import { getFeaturedProjects, getServices, getSettings } from '@/lib/content'

export default async function HomePage() {
  const [settings, projects, services] = await Promise.all([getSettings(), getFeaturedProjects(), getServices()])
  // Showreel when set in Sanity, otherwise the first featured project's hero.
  const heroMedia = settings.showreel ?? projects[0]?.heroMedia ?? { alt: 'Showreel coming soon', ratio: 16 / 9 }

  return (
    <>
      {/* Hero: spread headline, visual grows on scroll (after wearemotto.com). */}
      <HeroStage intro={`A branding studio in ${settings.city}. Strategy, identity, content and campaigns for people with an idea worth remembering.`} media={heroMedia} />

      {/* Statement: words gather in the middle and spread as it scrolls in. */}
      <section className="wrap mt-24 md:mt-40" aria-label="Simple. Strategic. Unforgettable.">
        <SpreadHeadline
          lines={settings.taglineWords.length === 3 ? [[settings.taglineWords[0], settings.taglineWords[1]], [settings.taglineWords[2]]] : [settings.taglineWords]}
          className="t-display !text-[clamp(2.1rem,9.4vw,10.5rem)]"
        />
      </section>

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
