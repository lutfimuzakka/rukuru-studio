import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/Reveal'
import { ContactForm } from '@/components/site/ContactForm'
import { getSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a branding project with Rukuru Studio. Send a brief or message us on WhatsApp.',
}

export default async function ContactPage() {
  const settings = await getSettings()
  return (
    <section className="wrap grid gap-16 pt-[6vh] md:grid-cols-12">
      <div className="md:col-span-5">
        <Reveal as="h1" variant="lines" immediate className="t-display">
          Start a project.
        </Reveal>
        <Reveal immediate delay={0.3} className="mt-10 flex flex-col gap-6">
          <p className="t-lead measure">Tell us where you are and where you want the brand to go. A rough idea is enough.</p>
          <div className="flex flex-col gap-1">
            <span className="t-small text-stone">Faster on WhatsApp</span>
            <a href={`https://wa.me/${settings.whatsapp}`} className="link w-fit t-h3">{settings.whatsappDisplay}</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="t-small text-stone">Email</span>
            <a href={`mailto:${settings.email}`} className="link w-fit t-h3">{settings.email}</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="t-small text-stone">Studio</span>
            <span className="t-h3">{settings.city}, {settings.country}</span>
          </div>
        </Reveal>
      </div>
      <div className="md:col-span-6 md:col-start-7 md:pt-4">
        <ContactForm />
      </div>
    </section>
  )
}
