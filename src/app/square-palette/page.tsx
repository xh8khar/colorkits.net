import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Square Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning square palette color schemes instantly. Free online square palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['square palette', 'square palette tool', 'square palette online', 'square palette color tool'],
  openGraph: {
    title: 'Square Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning square palette color schemes instantly.',
  },
  twitter: {
    title: 'Square Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning square palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
