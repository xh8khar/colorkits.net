import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brightness Analyzer - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online brightness analyzer for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['brightness analyzer', 'brightness analyzer tool', 'brightness analyzer online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Brightness Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Brightness Analyzer - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
