import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Batch Image Color Extractor - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online batch image color extractor for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['batch image color extractor', 'batch image color extractor tool', 'batch image color extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Batch Image Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Batch Image Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
