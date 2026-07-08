import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dominant Color Extractor - Free Online Color Tool | ColorKits',
  description: 'Extract dominant colors from any image with AI-powered analysis. Free online dominant color extractor for designers and developers. Get the most prominent color palette from your photos and graphics.',
  keywords: ['dominant color extractor', 'dominant color extractor tool', 'dominant color extractor online', 'color extractor', 'color analyzer'],
  openGraph: {
    title: 'Dominant Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Extract dominant colors from any image with AI-powered analysis.',
  },
  twitter: {
    title: 'Dominant Color Extractor - Free Online Color Tool | ColorKits',
    description: 'Extract dominant colors from any image with AI-powered analysis.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
