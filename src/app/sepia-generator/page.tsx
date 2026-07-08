import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Sepia Generator - Free Online Color Tool | ColorKits',
  description: 'Generate sepia for your design projects. Free online sepia with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['sepia', 'sepia generator', 'sepia tool', 'sepia online', 'color generator'],
  openGraph: {
    title: 'Sepia Generator - Free Online Color Tool | ColorKits',
    description: 'Generate sepia for your design projects.',
  },
  twitter: {
    title: 'Sepia Generator - Free Online Color Tool | ColorKits',
    description: 'Generate sepia for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
