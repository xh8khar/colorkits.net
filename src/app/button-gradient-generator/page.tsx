import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Button Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore button gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['button gradient generator', 'button gradient generator tool', 'button gradient generator online', 'button gradient generator color tool'],
  openGraph: {
    title: 'Button Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore button gradient generator for your design projects.',
  },
  twitter: {
    title: 'Button Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore button gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
