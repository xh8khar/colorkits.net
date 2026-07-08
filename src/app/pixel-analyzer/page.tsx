import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pixel Analyzer - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online pixel analyzer for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['pixel analyzer', 'pixel analyzer tool', 'pixel analyzer online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Pixel Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Pixel Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
