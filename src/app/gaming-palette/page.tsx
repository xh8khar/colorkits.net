import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gaming Palette - Free Online Color Tool | ColorKits',
  description: 'Use this free online gaming palette tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['gaming palette', 'gaming palette tool', 'gaming palette online', 'gaming palette color tool'],
  openGraph: {
    title: 'Gaming Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online gaming palette tool for developers and designers.',
  },
  twitter: {
    title: 'Gaming Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online gaming palette tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
