import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Linear Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful linear gradient with customizable colors and angles. Free online linear gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['linear gradient', 'linear gradient generator', 'css linear gradient', 'linear gradient css', 'gradient generator'],
  openGraph: {
    title: 'Linear Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful linear gradient with customizable colors and angles.',
  },
  twitter: {
    title: 'Linear Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful linear gradient with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
