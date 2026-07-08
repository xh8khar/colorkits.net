import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Trends - Free Online Color Tool | ColorKits',
  description: 'Explore current color trends for your design projects. Free online color trends tool for designers. Stay updated with trending color palettes and popular color combinations.',
  keywords: ['color trends', 'trending colors', 'color trends tool', 'popular colors', 'color trends 2026'],
  openGraph: {
    title: 'Color Trends - Free Online Color Tool | ColorKits',
    description: 'Explore current color trends for your design projects.',
  },
  twitter: {
    title: 'Color Trends - Free Online Color Tool | ColorKits',
    description: 'Explore current color trends for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
