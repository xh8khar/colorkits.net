import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Flutter Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert flutter color converter between different color formats and systems. Free online flutter color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['flutter color converter', 'flutter color converter converter', 'flutter color converter tool', 'flutter color converter online', 'color converter'],
  openGraph: {
    title: 'Flutter Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert flutter color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Flutter Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert flutter color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
