import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brand Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate brand palette for your design projects. Free online brand palette with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['brand palette', 'brand palette generator', 'brand palette tool', 'brand palette online', 'color generator'],
  openGraph: {
    title: 'Brand Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate brand palette for your design projects.',
  },
  twitter: {
    title: 'Brand Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate brand palette for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
