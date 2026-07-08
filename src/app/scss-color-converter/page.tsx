import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'SCSS Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert scss color converter between different color formats and systems. Free online scss color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['scss color converter', 'scss color converter converter', 'scss color converter tool', 'scss color converter online', 'color converter'],
  openGraph: {
    title: 'SCSS Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert scss color converter between different color formats and systems.',
  },
  twitter: {
    title: 'SCSS Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert scss color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
