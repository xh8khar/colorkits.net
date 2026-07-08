import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Ai Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate ai palette for your design projects. Free online ai palette with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['ai palette', 'ai palette generator', 'ai palette tool', 'ai palette online', 'color generator'],
  openGraph: {
    title: 'Ai Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate ai palette for your design projects.',
  },
  twitter: {
    title: 'Ai Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate ai palette for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
