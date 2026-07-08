import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pastel Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore pastel gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['pastel gradient generator', 'pastel gradient generator tool', 'pastel gradient generator online', 'pastel gradient generator color tool'],
  openGraph: {
    title: 'Pastel Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore pastel gradient generator for your design projects.',
  },
  twitter: {
    title: 'Pastel Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore pastel gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
