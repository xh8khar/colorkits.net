import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Color Recommender - Free Online Color Tool | ColorKits',
  description: 'Use this free online background color recommender tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['background color recommender', 'background color recommender tool', 'background color recommender online', 'background color recommender color tool'],
  openGraph: {
    title: 'Background Color Recommender - Free Online Color Tool | ColorKits',
    description: 'Use this free online background color recommender tool for developers and designers.',
  },
  twitter: {
    title: 'Background Color Recommender - Free Online Color Tool | ColorKits',
    description: 'Use this free online background color recommender tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
