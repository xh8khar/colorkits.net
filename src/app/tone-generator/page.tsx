import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tone Generator - Free Online Color Tool | ColorKits',
  description: 'Generate tone for your design projects. Free online tone with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['tone', 'tone generator', 'tone tool', 'tone online', 'color generator'],
  openGraph: {
    title: 'Tone Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tone for your design projects.',
  },
  twitter: {
    title: 'Tone Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tone for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
