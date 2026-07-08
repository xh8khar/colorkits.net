import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Temperature Detector - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online color temperature detector for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['color temperature detector', 'color temperature detector tool', 'color temperature detector online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Color Temperature Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Color Temperature Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
