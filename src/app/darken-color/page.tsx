import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Darken Color - Free Online Color Tool | ColorKits',
  description: 'Use this free online darken color tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['darken color', 'darken color tool', 'darken color online', 'darken color color tool'],
  openGraph: {
    title: 'Darken Color - Free Online Color Tool | ColorKits',
    description: 'Use this free online darken color tool for developers and designers.',
  },
  twitter: {
    title: 'Darken Color - Free Online Color Tool | ColorKits',
    description: 'Use this free online darken color tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
