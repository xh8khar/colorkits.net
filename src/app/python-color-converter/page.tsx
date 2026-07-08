import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Python Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert python color converter between different color formats and systems. Free online python color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['python color converter', 'python color converter converter', 'python color converter tool', 'python color converter online', 'color converter'],
  openGraph: {
    title: 'Python Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert python color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Python Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert python color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
