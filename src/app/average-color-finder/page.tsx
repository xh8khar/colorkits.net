import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Average Color Finder - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online average color finder for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['average color finder', 'average color finder tool', 'average color finder online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Average Color Finder - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Average Color Finder - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
