import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Format Detector - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online color format detector for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['color format detector', 'color format detector tool', 'color format detector online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Color Format Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Color Format Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
