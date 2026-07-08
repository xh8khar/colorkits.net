import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Multiply Blend Generator - Free Online Color Tool | ColorKits',
  description: 'Generate multiply blend for your design projects. Free online multiply blend with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['multiply blend', 'multiply blend generator', 'multiply blend tool', 'multiply blend online', 'color generator'],
  openGraph: {
    title: 'Multiply Blend Generator - Free Online Color Tool | ColorKits',
    description: 'Generate multiply blend for your design projects.',
  },
  twitter: {
    title: 'Multiply Blend Generator - Free Online Color Tool | ColorKits',
    description: 'Generate multiply blend for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
