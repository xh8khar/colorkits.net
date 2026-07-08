import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Animation Builder - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient animation builder with customizable options. Free online gradient animation builder generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient animation', 'gradient animation builder', 'animated gradient css', 'css gradient animation', 'moving gradient background'],
  openGraph: {
    title: 'Gradient Animation Builder - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient animation builder with customizable options.',
  },
  twitter: {
    title: 'Gradient Animation Builder - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient animation builder with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
