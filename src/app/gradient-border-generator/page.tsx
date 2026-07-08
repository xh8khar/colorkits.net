import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Border Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore gradient border generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['gradient border generator', 'gradient border generator tool', 'gradient border generator online', 'gradient border generator color tool'],
  openGraph: {
    title: 'Gradient Border Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore gradient border generator for your design projects.',
  },
  twitter: {
    title: 'Gradient Border Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore gradient border generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
