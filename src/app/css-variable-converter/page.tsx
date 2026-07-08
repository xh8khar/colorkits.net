import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Variable Converter - Free Online Color Tool | ColorKits',
  description: 'Convert css variable converter between different color formats and systems. Free online css variable converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['css variable converter', 'css variable converter converter', 'css variable converter tool', 'css variable converter online', 'color converter'],
  openGraph: {
    title: 'CSS Variable Converter - Free Online Color Tool | ColorKits',
    description: 'Convert css variable converter between different color formats and systems.',
  },
  twitter: {
    title: 'CSS Variable Converter - Free Online Color Tool | ColorKits',
    description: 'Convert css variable converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
