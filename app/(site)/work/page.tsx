import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/Reveal'
import { WorkIndex } from '@/components/site/WorkIndex'
import { getProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies in brand strategy, identity, content and campaigns by Rukuru Studio.',
}

export default async function WorkPage() {
  const projects = await getProjects()
  return (
    <section className="wrap pt-[6vh]">
      <Reveal as="h1" variant="lines" immediate className="t-display">
        Work
      </Reveal>
      <Reveal as="p" immediate delay={0.3} className="t-lead measure mt-6 max-w-[38ch] text-stone">
        Brands we have helped shape, from the first idea to the launch.
      </Reveal>
      <WorkIndex projects={projects} />
    </section>
  )
}
