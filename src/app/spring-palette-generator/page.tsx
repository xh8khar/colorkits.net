import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Spring Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning spring palette generator color schemes instantly. Free online spring palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['spring palette generator', 'spring palette generator tool', 'spring palette generator online', 'spring palette generator color tool'],
  openGraph: {
    title: 'Spring Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning spring palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Spring Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning spring palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
