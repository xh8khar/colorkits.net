import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tailwind CSS Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning tailwind palette generator color schemes instantly. Free online tailwind palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['tailwind palette generator', 'tailwind palette generator tool', 'tailwind palette generator online', 'tailwind palette generator color tool'],
  openGraph: {
    title: 'Tailwind CSS Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning tailwind palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Tailwind CSS Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning tailwind palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
