import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Hue Rotator - Free Online Color Tool | ColorKits',
  description: 'Use this free online hue rotator tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['hue rotator', 'hue rotator tool', 'hue rotator online', 'hue rotator color tool'],
  openGraph: {
    title: 'Hue Rotator - Free Online Color Tool | ColorKits',
    description: 'Use this free online hue rotator tool for developers and designers.',
  },
  twitter: {
    title: 'Hue Rotator - Free Online Color Tool | ColorKits',
    description: 'Use this free online hue rotator tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
