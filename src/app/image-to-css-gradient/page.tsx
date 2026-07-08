import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image to CSS Gradient - Free Online Color Tool | ColorKits',
  description: 'Use this free online image to css gradient tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['image to css gradient', 'image to css gradient tool', 'image to css gradient online', 'image to css gradient color tool'],
  openGraph: {
    title: 'Image to CSS Gradient - Free Online Color Tool | ColorKits',
    description: 'Use this free online image to css gradient tool for developers and designers.',
  },
  twitter: {
    title: 'Image to CSS Gradient - Free Online Color Tool | ColorKits',
    description: 'Use this free online image to css gradient tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
