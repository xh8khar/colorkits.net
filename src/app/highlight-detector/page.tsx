import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Highlight Detector - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online highlight detector for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['highlight detector', 'highlight detector tool', 'highlight detector online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Highlight Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Highlight Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
