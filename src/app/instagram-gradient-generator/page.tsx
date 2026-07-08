import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Instagram Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate instagram gradient for your design projects. Free online instagram gradient with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['instagram gradient', 'instagram gradient generator', 'instagram gradient tool', 'instagram gradient online', 'color generator'],
  openGraph: {
    title: 'Instagram Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate instagram gradient for your design projects.',
  },
  twitter: {
    title: 'Instagram Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate instagram gradient for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
