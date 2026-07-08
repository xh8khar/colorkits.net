import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Three Color Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore three color gradient for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['three color gradient', 'three color gradient tool', 'three color gradient online', 'three color gradient color tool'],
  openGraph: {
    title: 'Three Color Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore three color gradient for your design projects.',
  },
  twitter: {
    title: 'Three Color Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore three color gradient for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
