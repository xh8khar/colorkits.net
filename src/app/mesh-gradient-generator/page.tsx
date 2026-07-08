import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Mesh Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore mesh gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['mesh gradient generator', 'mesh gradient generator tool', 'mesh gradient generator online', 'mesh gradient generator color tool'],
  openGraph: {
    title: 'Mesh Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore mesh gradient generator for your design projects.',
  },
  twitter: {
    title: 'Mesh Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore mesh gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
