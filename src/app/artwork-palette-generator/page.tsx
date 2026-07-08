import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Artwork Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate artwork palette for your design projects. Free online artwork palette with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['artwork palette', 'artwork palette generator', 'artwork palette tool', 'artwork palette online', 'color generator'],
  openGraph: {
    title: 'Artwork Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate artwork palette for your design projects.',
  },
  twitter: {
    title: 'Artwork Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate artwork palette for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
