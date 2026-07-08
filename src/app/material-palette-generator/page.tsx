import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Material Design Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning material palette generator color schemes instantly. Free online material palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['material palette generator', 'material palette generator tool', 'material palette generator online', 'material palette generator color tool'],
  openGraph: {
    title: 'Material Design Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning material palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Material Design Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning material palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
