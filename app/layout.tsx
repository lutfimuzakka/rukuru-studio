import type { Metadata, Viewport } from 'next'
import './globals.css'

const typekitId = process.env.NEXT_PUBLIC_TYPEKIT_ID
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
      <head>
        {typekitId && (
          <>
            <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
            <link rel="stylesheet" href={`https://use.typekit.net/${typekitId}.css`} />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
