import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Duplicate Color Finder - Free Online Color Tool | ColorKits',
  description: 'Find duplicate or similar colors in your design projects. Free online duplicate color finder for designers and developers. Identify and eliminate redundant colors from your palette.',
  keywords: ['duplicate color finder', 'duplicate color finder tool', 'duplicate color finder online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Duplicate Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find duplicate or similar colors in your design projects.',
  },
  twitter: {
    title: 'Duplicate Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find duplicate or similar colors in your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
