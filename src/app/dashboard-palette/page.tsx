import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dashboard Palette - Free Online Color Tool | ColorKits',
  description: 'Use this free online dashboard palette tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['dashboard palette', 'dashboard palette tool', 'dashboard palette online', 'dashboard palette color tool'],
  openGraph: {
    title: 'Dashboard Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online dashboard palette tool for developers and designers.',
  },
  twitter: {
    title: 'Dashboard Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online dashboard palette tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
