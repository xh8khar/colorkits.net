import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Autumn Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning autumn palette generator color schemes instantly. Free online autumn palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['autumn palette generator', 'autumn palette generator tool', 'autumn palette generator online', 'autumn palette generator color tool'],
  openGraph: {
    title: 'Autumn Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning autumn palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Autumn Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning autumn palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
