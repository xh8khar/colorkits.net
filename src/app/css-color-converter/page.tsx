import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert css color converter between different color formats and systems. Free online css color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['css color converter', 'css color converter converter', 'css color converter tool', 'css color converter online', 'color converter'],
  openGraph: {
    title: 'CSS Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert css color converter between different color formats and systems.',
  },
  twitter: {
    title: 'CSS Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert css color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
