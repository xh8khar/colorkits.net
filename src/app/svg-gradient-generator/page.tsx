import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'SVG Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful svg gradient with customizable colors and angles. Free online svg gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['svg gradient', 'svg gradient generator', 'svg linear gradient', 'svg radial gradient', 'svg fill gradient'],
  openGraph: {
    title: 'SVG Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful svg gradient with customizable colors and angles.',
  },
  twitter: {
    title: 'SVG Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful svg gradient with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
