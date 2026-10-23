import { ViewTransition } from 'react'
import { Cursor } from '@/components/motion/Cursor'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { getSettings } from '@/lib/content'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2">
        Skip to content
      </a>
      <SmoothScroll />
      <Header />
      <ViewTransition>
        <main id="main" tabIndex={-1} className="pt-24 outline-none">
          {children}
        </main>
      </ViewTransition>
      <Footer settings={settings} />
      <Cursor />
    </>
  )
}
