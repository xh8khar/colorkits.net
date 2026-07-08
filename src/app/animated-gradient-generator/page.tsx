import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Animated Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore animated gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['animated gradient generator', 'animated gradient generator tool', 'animated gradient generator online', 'animated gradient generator color tool'],
  openGraph: {
    title: 'Animated Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore animated gradient generator for your design projects.',
  },
  twitter: {
    title: 'Animated Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore animated gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
