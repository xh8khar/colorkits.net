import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Swift Uicolor Converter - Free Online Color Tool | ColorKits',
  description: 'Convert swift uicolor converter between different color formats and systems. Free online swift uicolor converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['swift uicolor converter', 'swift uicolor converter converter', 'swift uicolor converter tool', 'swift uicolor converter online', 'color converter'],
  openGraph: {
    title: 'Swift Uicolor Converter - Free Online Color Tool | ColorKits',
    description: 'Convert swift uicolor converter between different color formats and systems.',
  },
  twitter: {
    title: 'Swift Uicolor Converter - Free Online Color Tool | ColorKits',
    description: 'Convert swift uicolor converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
