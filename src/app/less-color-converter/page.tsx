import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Less Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert less color converter between different color formats and systems. Free online less color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['less color converter', 'less color converter converter', 'less color converter tool', 'less color converter online', 'color converter'],
  openGraph: {
    title: 'Less Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert less color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Less Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert less color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
