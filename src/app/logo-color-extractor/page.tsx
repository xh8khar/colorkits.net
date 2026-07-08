import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Logo Color Extractor - Free Online Color Tool | ColorKits',
  description: 'Extract colors from logos and visual assets. Free online logo color extractor for designers. Generate color palettes from your logo with accurate color analysis.',
  keywords: ['logo color extractor', 'logo color extractor tool', 'logo color extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Logo Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Extract colors from logos and visual assets.',
  },
  twitter: {
    title: 'Logo Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Extract colors from logos and visual assets.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
