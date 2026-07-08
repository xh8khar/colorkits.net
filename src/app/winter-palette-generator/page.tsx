import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Winter Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning winter palette generator color schemes instantly. Free online winter palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['winter palette generator', 'winter palette generator tool', 'winter palette generator online', 'winter palette generator color tool'],
  openGraph: {
    title: 'Winter Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning winter palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Winter Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning winter palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
