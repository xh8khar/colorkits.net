import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Lighten Color - Free Online Color Tool | ColorKits',
  description: 'Use this free online lighten color tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['lighten color', 'lighten color tool', 'lighten color online', 'lighten color color tool'],
  openGraph: {
    title: 'Lighten Color - Free Online Color Tool | ColorKits',
    description: 'Use this free online lighten color tool for developers and designers.',
  },
  twitter: {
    title: 'Lighten Color - Free Online Color Tool | ColorKits',
    description: 'Use this free online lighten color tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
