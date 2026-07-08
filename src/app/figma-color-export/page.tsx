import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Figma Color Export - Free Online Color Tool | ColorKits',
  description: 'Export figma color export in multiple formats for your projects. Free online figma color export for developers and designers. Generate and download color assets with copy-ready code snippets.',
  keywords: ['figma color export', 'figma color export tool', 'figma color export online', 'color exporter', 'design export tool'],
  openGraph: {
    title: 'Figma Color Export - Free Online Color Tool | ColorKits',
    description: 'Export figma color export in multiple formats for your projects.',
  },
  twitter: {
    title: 'Figma Color Export - Free Online Color Tool | ColorKits',
    description: 'Export figma color export in multiple formats for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
