import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Vibrance Analyzer - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online vibrance analyzer for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['vibrance analyzer', 'vibrance analyzer tool', 'vibrance analyzer online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Vibrance Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Vibrance Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
