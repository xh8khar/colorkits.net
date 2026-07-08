import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Overlay Color Generator - Free Online Color Tool | ColorKits',
  description: 'Generate overlay color for your design projects. Free online overlay color with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['overlay color', 'overlay color generator', 'overlay color tool', 'overlay color online', 'color generator'],
  openGraph: {
    title: 'Overlay Color Generator - Free Online Color Tool | ColorKits',
    description: 'Generate overlay color for your design projects.',
  },
  twitter: {
    title: 'Overlay Color Generator - Free Online Color Tool | ColorKits',
    description: 'Generate overlay color for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
