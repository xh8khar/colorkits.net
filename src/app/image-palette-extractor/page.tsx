import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Palette Extractor - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online image palette extractor for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['image palette extractor', 'image palette extractor tool', 'image palette extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Image Palette Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Image Palette Extractor - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
