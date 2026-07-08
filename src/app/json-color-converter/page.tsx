import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'JSON Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert json color converter between different color formats and systems. Free online json color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['json color converter', 'json color converter converter', 'json color converter tool', 'json color converter online', 'color converter'],
  openGraph: {
    title: 'JSON Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert json color converter between different color formats and systems.',
  },
  twitter: {
    title: 'JSON Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert json color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
