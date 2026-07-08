import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Glassmorphism Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore glass gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['glass gradient generator', 'glass gradient generator tool', 'glass gradient generator online', 'glass gradient generator color tool'],
  openGraph: {
    title: 'Glassmorphism Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore glass gradient generator for your design projects.',
  },
  twitter: {
    title: 'Glassmorphism Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore glass gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
