import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Java Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert java color converter between different color formats and systems. Free online java color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['java color converter', 'java color converter converter', 'java color converter tool', 'java color converter online', 'color converter'],
  openGraph: {
    title: 'Java Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert java color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Java Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert java color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
