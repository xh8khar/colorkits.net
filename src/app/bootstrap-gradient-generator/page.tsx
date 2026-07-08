import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Bootstrap Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate bootstrap gradient for your design projects. Free online bootstrap gradient with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['bootstrap gradient', 'bootstrap gradient generator', 'bootstrap gradient tool', 'bootstrap gradient online', 'color generator'],
  openGraph: {
    title: 'Bootstrap Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate bootstrap gradient for your design projects.',
  },
  twitter: {
    title: 'Bootstrap Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate bootstrap gradient for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
