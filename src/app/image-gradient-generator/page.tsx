import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Create beautiful image gradient with customizable colors and angles. Free online image gradient generator for web developers and designers. Generate smooth color transitions with real-time preview and ready-to-use CSS code.',
  keywords: ['image gradient', 'image gradient generator', 'gradient over image', 'image overlay gradient', 'photo gradient'],
  openGraph: {
    title: 'Image Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful image gradient with customizable colors and angles.',
  },
  twitter: {
    title: 'Image Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Create beautiful image gradient with customizable colors and angles.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
