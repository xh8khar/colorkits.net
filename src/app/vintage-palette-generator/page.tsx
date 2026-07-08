import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Vintage Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning vintage palette generator color schemes instantly. Free online vintage palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['vintage palette generator', 'vintage palette generator tool', 'vintage palette generator online', 'vintage palette generator color tool'],
  openGraph: {
    title: 'Vintage Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning vintage palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Vintage Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning vintage palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
