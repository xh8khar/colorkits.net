import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning ui palette generator color schemes instantly. Free online ui palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['ui palette generator', 'ui palette generator tool', 'ui palette generator online', 'ui palette generator color tool'],
  openGraph: {
    title: 'UI Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning ui palette generator color schemes instantly.',
  },
  twitter: {
    title: 'UI Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning ui palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
