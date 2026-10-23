import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/Reveal'
import { Media } from '@/components/site/Media'
import { getSettings, getTeam } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description: 'Rukuru Studio is a branding studio in Malang, Indonesia. How we work and who we are.',
}

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSettings(), getTeam()])

  return (
    <>
      <section className="wrap pt-[6vh]">
        <Reveal as="h1" variant="lines" immediate className="t-display max-w-[13ch]">
          {settings.about.heading}
        </Reveal>
      </section>

      <section className="wrap mt-20 grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7 md:col-start-6">
          {settings.about.body.map((p, i) => (
            <Reveal as="p" key={i} className="t-lead measure">
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap mt-24 md:mt-32">
        <Reveal variant="media">
          <Media media={{ alt: 'Placeholder: the studio in Malang', ratio: 21 / 9, tone: '#e4e4df' }} />
        </Reveal>
      </section>

      {/* Process is a real sequence, so it is numbered. */}
      <section className="wrap mt-32 md:mt-48" aria-labelledby="process">
        <Reveal as="h2" variant="lines" className="t-h1">
          <span id="process">How a project runs</span>
        </Reveal>
        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-[var(--gutter)]">
          {settings.process.map((step, i) => (
            <li key={step.title} className="border-t border-ink pt-5">
              <span className="t-small text-stone">Step {i + 1}</span>
              <h3 className="t-h2 mt-3">{step.title}</h3>
              <p className="mt-4 text-ink/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {team.length > 0 && (
        <section className="wrap mt-32 md:mt-48" aria-labelledby="team">
          <h2 id="team" className="t-h1">The team</h2>
          <ul className="mt-14 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-4">
            {team.map((m, i) => (
              <li key={i}>
                <Media media={m.photo ?? { alt: 'Placeholder portrait', ratio: 4 / 5, tone: '#e4e4df' }} sizes="25vw" />
                <p className="mt-4 t-h3">{m.name}</p>
                <p className="text-stone">{m.role}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
