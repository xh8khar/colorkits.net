import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Transparent Color Detector - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online transparent color detector for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['transparent color detector', 'transparent color detector tool', 'transparent color detector online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Transparent Color Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Transparent Color Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
