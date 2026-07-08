import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Neon Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore neon gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['neon gradient generator', 'neon gradient generator tool', 'neon gradient generator online', 'neon gradient generator color tool'],
  openGraph: {
    title: 'Neon Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore neon gradient generator for your design projects.',
  },
  twitter: {
    title: 'Neon Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore neon gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
