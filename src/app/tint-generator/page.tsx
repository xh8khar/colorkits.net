import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tint Generator - Free Online Color Tool | ColorKits',
  description: 'Generate tint for your design projects. Free online tint with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['tint', 'tint generator', 'tint tool', 'tint online', 'color generator'],
  openGraph: {
    title: 'Tint Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tint for your design projects.',
  },
  twitter: {
    title: 'Tint Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tint for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
