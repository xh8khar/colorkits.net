import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Overlay Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore gradient overlay generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['gradient overlay generator', 'gradient overlay generator tool', 'gradient overlay generator online', 'gradient overlay generator color tool'],
  openGraph: {
    title: 'Gradient Overlay Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore gradient overlay generator for your design projects.',
  },
  twitter: {
    title: 'Gradient Overlay Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore gradient overlay generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
