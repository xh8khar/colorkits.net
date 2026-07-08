import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'eCommerce Palette - Free Online Color Tool | ColorKits',
  description: 'Use this free online ecommerce palette tool for developers and designers. Convert, generate, and analyze colors with real-time preview and export features. Perfect for web design and development projects.',
  keywords: ['ecommerce palette', 'ecommerce palette tool', 'ecommerce palette online', 'ecommerce palette color tool'],
  openGraph: {
    title: 'eCommerce Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online ecommerce palette tool for developers and designers.',
  },
  twitter: {
    title: 'eCommerce Palette - Free Online Color Tool | ColorKits',
    description: 'Use this free online ecommerce palette tool for developers and designers.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
