import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Android XML Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert android xml color converter between different color formats and systems. Free online android xml color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['android xml color converter', 'android xml color converter converter', 'android xml color converter tool', 'android xml color converter online', 'color converter'],
  openGraph: {
    title: 'Android XML Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert android xml color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Android XML Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert android xml color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
