import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Color Histogram - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online image color histogram for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['image color histogram', 'image color histogram tool', 'image color histogram online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Image Color Histogram - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Image Color Histogram - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
