import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Photo Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate photo palette for your design projects. Free online photo palette with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['photo palette', 'photo palette generator', 'photo palette tool', 'photo palette online', 'color generator'],
  openGraph: {
    title: 'Photo Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate photo palette for your design projects.',
  },
  twitter: {
    title: 'Photo Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate photo palette for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
