import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Color Counter - Free Online Color Tool | ColorKits',
  description: 'Analyze and detect colors in images and designs. Free online image color counter for color analysis and optimization. Get detailed insights about color properties and distributions.',
  keywords: ['image color counter', 'image color counter tool', 'image color counter online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Image Color Counter - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
  twitter: {
    title: 'Image Color Counter - Free Online Color Tool | ColorKits',
    description: 'Analyze and detect colors in images and designs.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
