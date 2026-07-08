import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Aurora Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore aurora gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['aurora gradient generator', 'aurora gradient generator tool', 'aurora gradient generator online', 'aurora gradient generator color tool'],
  openGraph: {
    title: 'Aurora Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore aurora gradient generator for your design projects.',
  },
  twitter: {
    title: 'Aurora Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore aurora gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
