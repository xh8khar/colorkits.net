import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'SVG Mesh Generator - Free Online Color Tool | ColorKits',
  description: 'Generate svg mesh for your design projects. Free online svg mesh with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['svg mesh', 'svg mesh generator', 'svg mesh tool', 'svg mesh online', 'color generator'],
  openGraph: {
    title: 'SVG Mesh Generator - Free Online Color Tool | ColorKits',
    description: 'Generate svg mesh for your design projects.',
  },
  twitter: {
    title: 'SVG Mesh Generator - Free Online Color Tool | ColorKits',
    description: 'Generate svg mesh for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
