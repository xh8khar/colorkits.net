import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Cluster Analyzer - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online color cluster analyzer for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['color cluster analyzer', 'color cluster analyzer tool', 'color cluster analyzer online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Color Cluster Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Color Cluster Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
