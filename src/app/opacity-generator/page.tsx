import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Opacity Generator - Free Online Color Tool | ColorKits',
  description: 'Generate opacity for your design projects. Free online opacity with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['opacity', 'opacity generator', 'opacity tool', 'opacity online', 'color generator'],
  openGraph: {
    title: 'Opacity Generator - Free Online Color Tool | ColorKits',
    description: 'Generate opacity for your design projects.',
  },
  twitter: {
    title: 'Opacity Generator - Free Online Color Tool | ColorKits',
    description: 'Generate opacity for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
