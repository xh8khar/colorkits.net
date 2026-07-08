import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Angle Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient angle with customizable colors and angles. Free online gradient angle generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['gradient angle', 'gradient angle generator', 'css gradient angle', 'gradient direction', 'gradient degree'],
  openGraph: {
    title: 'Gradient Angle Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient angle with customizable colors and angles.',
  },
  twitter: {
    title: 'Gradient Angle Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient angle with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
