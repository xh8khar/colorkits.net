import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Shadow Detector - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online shadow detector for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['shadow detector', 'shadow detector tool', 'shadow detector online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Shadow Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Shadow Detector - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
