import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Accessible Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate accessible gradient for your design projects. Free online accessible gradient with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['accessible gradient', 'accessible gradient generator', 'accessible gradient tool', 'accessible gradient online', 'color generator'],
  openGraph: {
    title: 'Accessible Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate accessible gradient for your design projects.',
  },
  twitter: {
    title: 'Accessible Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate accessible gradient for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
