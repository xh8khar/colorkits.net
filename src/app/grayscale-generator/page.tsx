import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Grayscale Generator - Free Online Color Tool | ColorKits',
  description: 'Generate grayscale for your design projects. Free online grayscale with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['grayscale', 'grayscale generator', 'grayscale tool', 'grayscale online', 'color generator'],
  openGraph: {
    title: 'Grayscale Generator - Free Online Color Tool | ColorKits',
    description: 'Generate grayscale for your design projects.',
  },
  twitter: {
    title: 'Grayscale Generator - Free Online Color Tool | ColorKits',
    description: 'Generate grayscale for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
