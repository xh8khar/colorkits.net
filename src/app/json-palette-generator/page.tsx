import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'JSON Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate json palette for your design projects. Free online json palette with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['json palette', 'json palette generator', 'json palette tool', 'json palette online', 'color generator'],
  openGraph: {
    title: 'JSON Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate json palette for your design projects.',
  },
  twitter: {
    title: 'JSON Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate json palette for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
