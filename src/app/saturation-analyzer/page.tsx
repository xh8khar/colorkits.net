import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Saturation Analyzer - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online saturation analyzer for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['saturation analyzer', 'saturation analyzer tool', 'saturation analyzer online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Saturation Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Saturation Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
