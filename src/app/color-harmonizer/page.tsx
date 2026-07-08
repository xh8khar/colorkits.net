import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Harmonizer - Free Online Color Tool | ColorKits',
  description: 'Use this free online color harmonizer tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['color harmonizer', 'color harmonizer tool', 'color harmonizer online', 'color harmonizer color tool'],
  openGraph: {
    title: 'Color Harmonizer - Free Online Color Tool | ColorKits',
    description: 'Use this free online color harmonizer tool for developers and designers.',
  },
  twitter: {
    title: 'Color Harmonizer - Free Online Color Tool | ColorKits',
    description: 'Use this free online color harmonizer tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
