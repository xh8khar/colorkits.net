import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Shade Generator - Free Online Color Tool | ColorKits',
  description: 'Generate shade for your design projects. Free online shade with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['shade', 'shade generator', 'shade tool', 'shade online', 'color generator'],
  openGraph: {
    title: 'Shade Generator - Free Online Color Tool | ColorKits',
    description: 'Generate shade for your design projects.',
  },
  twitter: {
    title: 'Shade Generator - Free Online Color Tool | ColorKits',
    description: 'Generate shade for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
