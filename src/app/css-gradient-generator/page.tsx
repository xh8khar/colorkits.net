import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful css gradient with customizable colors and angles. Free online css gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['css gradient', 'css gradient generator', 'css css gradient', 'css gradient online', 'gradient generator'],
  openGraph: {
    title: 'CSS Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful css gradient with customizable colors and angles.',
  },
  twitter: {
    title: 'CSS Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful css gradient with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
