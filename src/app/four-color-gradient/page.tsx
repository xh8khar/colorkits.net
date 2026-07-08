import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Four Color Gradient - Free Online Color Tool | ColorKits',
  description: 'Use this free online four color gradient tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['four color gradient', 'four color gradient tool', 'four color gradient online', 'four color gradient color tool'],
  openGraph: {
    title: 'Four Color Gradient - Free Online Color Tool | ColorKits',
    description: 'Use this free online four color gradient tool for developers and designers.',
  },
  twitter: {
    title: 'Four Color Gradient - Free Online Color Tool | ColorKits',
    description: 'Use this free online four color gradient tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
