import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Multi-Stop Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore multi stop gradient for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['multi stop gradient', 'multi stop gradient tool', 'multi stop gradient online', 'multi stop gradient color tool'],
  openGraph: {
    title: 'Multi-Stop Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore multi stop gradient for your design projects.',
  },
  twitter: {
    title: 'Multi-Stop Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore multi stop gradient for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
