import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Neon Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning neon palette generator color schemes instantly. Free online neon palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['neon palette generator', 'neon palette generator tool', 'neon palette generator online', 'neon palette generator color tool'],
  openGraph: {
    title: 'Neon Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning neon palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Neon Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning neon palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
