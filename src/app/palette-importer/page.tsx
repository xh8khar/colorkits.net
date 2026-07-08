import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Palette Importer - Free Online Color Tool | ColorKits',
  description: 'Import palette importer from external sources into your projects. Free online palette importer for designers and developers. Load color palettes and configurations from files and URLs.',
  keywords: ['palette importer', 'palette importer tool', 'palette importer online', 'color importer', 'palette importer'],
  openGraph: {
    title: 'Palette Importer - Free Online Color Tool | ColorKits',
    description: 'Import palette importer from external sources into your projects.',
  },
  twitter: {
    title: 'Palette Importer - Free Online Color Tool | ColorKits',
    description: 'Import palette importer from external sources into your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
