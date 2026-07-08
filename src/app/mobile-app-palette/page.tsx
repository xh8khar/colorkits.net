import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Mobile App Palette - Free Online Color Tool | ColorKits',
  description: 'Use this free online mobile app palette tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['mobile app palette', 'mobile app palette tool', 'mobile app palette online', 'mobile app palette color tool'],
  openGraph: {
    title: 'Mobile App Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online mobile app palette tool for developers and designers.',
  },
  twitter: {
    title: 'Mobile App Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online mobile app palette tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
