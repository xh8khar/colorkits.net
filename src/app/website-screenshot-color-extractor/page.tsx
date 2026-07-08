import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Website Screenshot Color Extractor - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online website screenshot color extractor for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['website screenshot color extractor', 'website screenshot color extractor tool', 'website screenshot color extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Website Screenshot Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Website Screenshot Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
