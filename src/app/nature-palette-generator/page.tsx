import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Nature Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning nature palette generator color schemes instantly. Free online nature palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['nature palette generator', 'nature palette generator tool', 'nature palette generator online', 'nature palette generator color tool'],
  openGraph: {
    title: 'Nature Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning nature palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Nature Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning nature palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
