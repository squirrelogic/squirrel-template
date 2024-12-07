import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SquirrelSoft - Innovative Software Solutions',
  description: 'SquirrelSoft specializes in SaaS, Web, CRM, Mobile, and Game Development',
  openGraph: {
    title: 'SquirrelSoft - Innovative Software Solutions',
    description: 'SquirrelSoft specializes in SaaS, Web, CRM, Mobile, and Game Development',
    url: 'https://squirrel.software',
    siteName: 'SquirrelSoft',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Squirrel-3gQjnl8lMXqcrFDNOc1hU8BAMCsSYb.svg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SquirrelSoft - Innovative Software Solutions',
    description: 'SquirrelSoft specializes in SaaS, Web, CRM, Mobile, and Game Development',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Squirrel-3gQjnl8lMXqcrFDNOc1hU8BAMCsSYb.svg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

