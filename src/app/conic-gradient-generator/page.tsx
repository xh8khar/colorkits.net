import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Conic Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful conic gradient with customizable colors and angles. Free online conic gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['conic gradient', 'conic gradient generator', 'css conic gradient', 'conic gradient css', 'gradient generator'],
  openGraph: {
    title: 'Conic Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful conic gradient with customizable colors and angles.',
  },
  twitter: {
    title: 'Conic Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful conic gradient with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
