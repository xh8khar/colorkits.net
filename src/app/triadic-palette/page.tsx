import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Triadic Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning triadic palette color schemes instantly. Free online triadic palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['triadic palette', 'triadic palette tool', 'triadic palette online', 'triadic palette color tool'],
  openGraph: {
    title: 'Triadic Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning triadic palette color schemes instantly.',
  },
  twitter: {
    title: 'Triadic Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning triadic palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
