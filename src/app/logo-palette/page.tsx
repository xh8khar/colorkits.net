import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Logo Palette - Free Online Color Tool | ColorKits',
  description: 'Use this free online logo palette tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['logo palette', 'logo palette tool', 'logo palette online', 'logo palette color tool'],
  openGraph: {
    title: 'Logo Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online logo palette tool for developers and designers.',
  },
  twitter: {
    title: 'Logo Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online logo palette tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
