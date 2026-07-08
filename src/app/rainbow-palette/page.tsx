import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Rainbow Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning rainbow palette color schemes instantly. Free online rainbow palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['rainbow palette', 'rainbow palette tool', 'rainbow palette online', 'rainbow palette color tool'],
  openGraph: {
    title: 'Rainbow Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning rainbow palette color schemes instantly.',
  },
  twitter: {
    title: 'Rainbow Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning rainbow palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
