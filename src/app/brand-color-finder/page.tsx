import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brand Color Finder - Free Online Color Tool | ColorKits',
  description: 'Find and identify brand colors from any website or logo. Free online brand color finder for designers and developers. Extract exact brand color values for competitor analysis and design reference.',
  keywords: ['brand color finder', 'brand color finder tool', 'brand color finder online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Brand Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find and identify brand colors from any website or logo.',
  },
  twitter: {
    title: 'Brand Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find and identify brand colors from any website or logo.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
