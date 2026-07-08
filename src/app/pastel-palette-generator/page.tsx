import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pastel Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning pastel palette generator color schemes instantly. Free online pastel palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['pastel palette generator', 'pastel palette generator tool', 'pastel palette generator online', 'pastel palette generator color tool'],
  openGraph: {
    title: 'Pastel Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning pastel palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Pastel Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning pastel palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
