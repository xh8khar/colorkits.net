import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Random Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate random palette for your design projects. Free online random palette with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['random palette', 'random palette generator', 'random palette tool', 'random palette online', 'color generator'],
  openGraph: {
    title: 'Random Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate random palette for your design projects.',
  },
  twitter: {
    title: 'Random Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate random palette for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
