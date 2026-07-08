import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Bootstrap Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning bootstrap palette generator color schemes instantly. Free online bootstrap palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['bootstrap palette generator', 'bootstrap palette generator tool', 'bootstrap palette generator online', 'bootstrap palette generator color tool'],
  openGraph: {
    title: 'Bootstrap Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning bootstrap palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Bootstrap Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning bootstrap palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
