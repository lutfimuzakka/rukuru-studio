import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/bricolage-grotesque/standard.css'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rukurustudio.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Rukuru Studio — Ideas become brands here', template: '%s · Rukuru Studio' },
  description: 'Rukuru Studio is a branding studio in Malang, Indonesia. Strategy, identity, content and campaigns. Simple. Strategic. Unforgettable.',
  openGraph: { siteName: 'Rukuru Studio', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#f5f5f2' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
