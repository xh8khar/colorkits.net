import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Icon Palette Extractor - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online icon palette extractor for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['icon palette extractor', 'icon palette extractor tool', 'icon palette extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Icon Palette Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Icon Palette Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
