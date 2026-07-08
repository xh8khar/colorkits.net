import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Equalizer - Free Online Color Tool | ColorKits',
  description: 'Use this free online color equalizer tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['color equalizer', 'color equalizer tool', 'color equalizer online', 'color equalizer color tool'],
  openGraph: {
    title: 'Color Equalizer - Free Online Color Tool | ColorKits',
    description: 'Use this free online color equalizer tool for developers and designers.',
  },
  twitter: {
    title: 'Color Equalizer - Free Online Color Tool | ColorKits',
    description: 'Use this free online color equalizer tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
