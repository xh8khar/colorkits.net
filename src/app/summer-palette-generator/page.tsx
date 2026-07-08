import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Summer Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning summer palette generator color schemes instantly. Free online summer palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['summer palette generator', 'summer palette generator tool', 'summer palette generator online', 'summer palette generator color tool'],
  openGraph: {
    title: 'Summer Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning summer palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Summer Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning summer palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
