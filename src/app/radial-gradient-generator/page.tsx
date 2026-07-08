import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Radial Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful radial gradient with customizable colors and angles. Free online radial gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['radial gradient', 'radial gradient generator', 'css radial gradient', 'radial gradient css', 'gradient generator'],
  openGraph: {
    title: 'Radial Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful radial gradient with customizable colors and angles.',
  },
  twitter: {
    title: 'Radial Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful radial gradient with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
