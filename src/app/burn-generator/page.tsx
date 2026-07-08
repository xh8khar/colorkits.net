import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Burn Generator - Free Online Color Tool | ColorKits',
  description: 'Generate burn for your design projects. Free online burn with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['burn', 'burn generator', 'burn tool', 'burn online', 'color generator'],
  openGraph: {
    title: 'Burn Generator - Free Online Color Tool | ColorKits',
    description: 'Generate burn for your design projects.',
  },
  twitter: {
    title: 'Burn Generator - Free Online Color Tool | ColorKits',
    description: 'Generate burn for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
