import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Balance Analyzer - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online color balance analyzer for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['color balance analyzer', 'color balance analyzer tool', 'color balance analyzer online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Color Balance Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Color Balance Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
