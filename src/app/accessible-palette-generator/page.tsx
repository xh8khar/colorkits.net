import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessible Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning accessible palette generator color schemes instantly. Free online accessible palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['accessible palette generator', 'accessible palette generator tool', 'accessible palette generator online', 'accessible palette generator color tool'],
  openGraph: {
    title: 'Accessible Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning accessible palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Accessible Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning accessible palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
