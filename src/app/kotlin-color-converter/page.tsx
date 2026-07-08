import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Kotlin Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert kotlin color converter between different color formats and systems. Free online kotlin color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['kotlin color converter', 'kotlin color converter converter', 'kotlin color converter tool', 'kotlin color converter online', 'color converter'],
  openGraph: {
    title: 'Kotlin Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert kotlin color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Kotlin Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert kotlin color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
