import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tailwind Color Converter - Free Online Color Tool | ColorKits',
  description: 'Convert tailwind color converter between different color formats and systems. Free online tailwind color converter for developers and designers. Fast, accurate color format conversion with real-time preview and copy-ready output.',
  keywords: ['tailwind color converter', 'tailwind color converter converter', 'tailwind color converter tool', 'tailwind color converter online', 'color converter'],
  openGraph: {
    title: 'Tailwind Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert tailwind color converter between different color formats and systems.',
  },
  twitter: {
    title: 'Tailwind Color Converter - Free Online Color Tool | ColorKits',
    description: 'Convert tailwind color converter between different color formats and systems.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
