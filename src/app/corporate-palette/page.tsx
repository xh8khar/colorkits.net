import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Corporate Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning corporate palette color schemes instantly. Free online corporate palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['corporate palette', 'corporate palette tool', 'corporate palette online', 'corporate palette color tool'],
  openGraph: {
    title: 'Corporate Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning corporate palette color schemes instantly.',
  },
  twitter: {
    title: 'Corporate Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning corporate palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
