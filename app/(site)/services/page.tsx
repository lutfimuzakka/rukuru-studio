import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { getProjects, getServices } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand strategy, visual identity, content and campaigns by Rukuru Studio in Malang.',
}

const faq = [
  { q: 'How long does a project take?', a: 'A focused identity usually takes 6–10 weeks. Strategy plus identity takes 10–16 weeks. We agree on a schedule before we start.' },
  { q: 'Do you work with early-stage founders?', a: 'Yes. Many of our clients come to us with an idea and a name, sometimes not even that.' },
  { q: 'How do we start?', a: 'Send a short brief through the contact page or WhatsApp. We reply within two working days to set up a call.' },
]

export default async function ServicesPage() {
  const [services, projects] = await Promise.all([getServices(), getProjects()])
  const bySlug = new Map(projects.map((p) => [p.slug, p]))

  return (
    <>
      <section className="wrap pt-[6vh]">
        <Reveal as="h1" variant="lines" immediate className="t-display max-w-[12ch]">
          From idea to brand.
        </Reveal>
        <Reveal as="p" immediate delay={0.3} className="t-lead measure mt-8 max-w-[40ch]">
          We work in four disciplines. Most projects start with strategy, because a brand is a decision before it is a design.
        </Reveal>
      </section>

      <div className="wrap mt-24 border-t border-line md:mt-32">
        {services.map((s) => {
          const related = s.relatedProjects.map((slug) => bySlug.get(slug)).filter(Boolean)
          return (
            <section key={s.slug} id={s.slug} className="grid scroll-mt-28 gap-6 border-b border-line py-14 md:grid-cols-12">
              <Reveal as="h2" variant="lines" className="t-h1 md:col-span-5">
                {s.title}
              </Reveal>
              <div className="md:col-span-6 md:col-start-7">
                <p className="t-lead">{s.description}</p>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-ink/80">
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {related.length > 0 && (
                  <p className="mt-8 t-small text-stone">
                    See it in{' '}
                    {related.map((p, i) => (
                      <span key={p!.slug}>
                        {i > 0 && (i === related.length - 1 ? ' and ' : ', ')}
                        <Link href={`/work/${p!.slug}`} className="link text-ink">{p!.client}</Link>
                      </span>
                    ))}
                    .
                  </p>
                )}
              </div>
            </section>
          )
        })}
      </div>

      <section className="wrap mt-32 grid gap-10 md:grid-cols-12" aria-labelledby="faq">
        <h2 id="faq" className="t-h2 md:col-span-4">Before you ask</h2>
        <dl className="flex flex-col gap-10 md:col-span-7 md:col-start-6">
          {faq.map((f) => (
            <div key={f.q}>
              <dt className="t-h3">{f.q}</dt>
              <dd className="mt-2 measure text-ink/80">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
