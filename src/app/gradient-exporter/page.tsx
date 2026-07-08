import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Exporter - Free Online Color Tool | ColorKits',
  description: 'Create beautiful gradient exporter with customizable options. Free online gradient exporter generator for web developers and designers. Generate with real-time preview and CSS code export.',
  keywords: ['gradient exporter', 'export gradient', 'gradient to css', 'gradient to svg', 'gradient download'],
  openGraph: {
    title: 'Gradient Exporter - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient exporter with customizable options.',
  },
  twitter: {
    title: 'Gradient Exporter - Free Online Color Tool | ColorKits',
    description: 'Create beautiful gradient exporter with customizable options.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
