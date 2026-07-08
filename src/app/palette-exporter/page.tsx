import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Palette Exporter - Free Online Color Tool | ColorKits',
  description: 'Export palette exporter in multiple formats for your projects. Free online palette exporter for developers and designers. Generate and download color assets with copy-ready code snippets.',
  keywords: ['palette exporter', 'palette exporter tool', 'palette exporter online', 'color exporter', 'design export tool'],
  openGraph: {
    title: 'Palette Exporter - Free Online Color Tool | ColorKits',
    description: 'Export palette exporter in multiple formats for your projects.',
  },
  twitter: {
    title: 'Palette Exporter - Free Online Color Tool | ColorKits',
    description: 'Export palette exporter in multiple formats for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
