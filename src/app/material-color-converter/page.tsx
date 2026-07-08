import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Material Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert material color converter between different color formats and systems. Free online material color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['material color converter', 'material color converter converter', 'material color converter tool', 'material color converter online', 'color converter'],
  openGraph: {
    title: 'Material Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert material color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Material Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert material color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
