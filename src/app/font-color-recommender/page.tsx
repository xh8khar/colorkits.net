import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Font Color Recommender - Free Online Color Tool | ColorKits',
  description: 'Use this free online font color recommender tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['font color recommender', 'font color recommender tool', 'font color recommender online', 'font color recommender color tool'],
  openGraph: {
    title: 'Font Color Recommender - Free Online Color Tool | ColorKits',
    description: 'Use this free online font color recommender tool for developers and designers.',
  },
  twitter: {
    title: 'Font Color Recommender - Free Online Color Tool | ColorKits',
    description: 'Use this free online font color recommender tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
