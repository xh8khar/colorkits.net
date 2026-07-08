import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Metallic Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore metallic gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['metallic gradient generator', 'metallic gradient generator tool', 'metallic gradient generator online', 'metallic gradient generator color tool'],
  openGraph: {
    title: 'Metallic Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore metallic gradient generator for your design projects.',
  },
  twitter: {
    title: 'Metallic Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore metallic gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
