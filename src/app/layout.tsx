import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/layout/Footer'
import LayoutShell from '@/components/layout/LayoutShell'
import { ToastProvider } from '@/components/ui/Toast'

import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ColorKits — Free Online Color Tools for Developers',
    template: '%s | ColorKits',
  },
  description: 'Free online color tools: converter, palette generator, contrast checker, and more. Browser-based color utilities. No server upload. 100% private.',
  keywords: ['color tools', 'hex to rgb', 'color palette', 'contrast checker', 'gradient generator', 'free color tools'],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'ColorKits',
    title: 'ColorKits — Free Online Color Tools for Developers',
    description: 'Free online color tools: converter, palette generator, contrast checker.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ColorKits — Free Online Color Tools',
    description: 'Free online color tools: converter, palette generator, contrast checker.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f43f5e" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ToastProvider>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
      </body>
    </html>
  )
}
