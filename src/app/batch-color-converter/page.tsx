import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Batch Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert batch color converter between different color formats and systems. Free online batch color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['batch color converter', 'batch color converter converter', 'batch color converter tool', 'batch color converter online', 'color converter'],
  openGraph: {
    title: 'Batch Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert batch color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Batch Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert batch color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
