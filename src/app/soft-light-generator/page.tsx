import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Soft Light Generator - Free Online Color Tool | ColorKits',
  description: 'Generate soft light for your design projects. Free online soft light with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['soft light', 'soft light generator', 'soft light tool', 'soft light online', 'color generator'],
  openGraph: {
    title: 'Soft Light Generator - Free Online Color Tool | ColorKits',
    description: 'Generate soft light for your design projects.',
  },
  twitter: {
    title: 'Soft Light Generator - Free Online Color Tool | ColorKits',
    description: 'Generate soft light for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
