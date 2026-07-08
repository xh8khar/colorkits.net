import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Sunset Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning sunset palette generator color schemes instantly. Free online sunset palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['sunset palette generator', 'sunset palette generator tool', 'sunset palette generator online', 'sunset palette generator color tool'],
  openGraph: {
    title: 'Sunset Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning sunset palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Sunset Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning sunset palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
