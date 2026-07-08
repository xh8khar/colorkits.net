import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Dodge Generator - Free Online Color Tool | ColorKits',
  description: 'Generate color dodge for your design projects. Free online color dodge with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['color dodge', 'color dodge generator', 'color dodge tool', 'color dodge online', 'color generator'],
  openGraph: {
    title: 'Color Dodge Generator - Free Online Color Tool | ColorKits',
    description: 'Generate color dodge for your design projects.',
  },
  twitter: {
    title: 'Color Dodge Generator - Free Online Color Tool | ColorKits',
    description: 'Generate color dodge for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
