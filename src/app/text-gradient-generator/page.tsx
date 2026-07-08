import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Text Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore text gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['text gradient generator', 'text gradient generator tool', 'text gradient generator online', 'text gradient generator color tool'],
  openGraph: {
    title: 'Text Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore text gradient generator for your design projects.',
  },
  twitter: {
    title: 'Text Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore text gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
