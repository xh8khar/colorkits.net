import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Shadow Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore gradient shadow generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['gradient shadow generator', 'gradient shadow generator tool', 'gradient shadow generator online', 'gradient shadow generator color tool'],
  openGraph: {
    title: 'Gradient Shadow Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore gradient shadow generator for your design projects.',
  },
  twitter: {
    title: 'Gradient Shadow Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore gradient shadow generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
