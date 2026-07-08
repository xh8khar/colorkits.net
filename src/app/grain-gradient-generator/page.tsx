import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Grain Texture Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore grain gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['grain gradient generator', 'grain gradient generator tool', 'grain gradient generator online', 'grain gradient generator color tool'],
  openGraph: {
    title: 'Grain Texture Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore grain gradient generator for your design projects.',
  },
  twitter: {
    title: 'Grain Texture Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore grain gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
