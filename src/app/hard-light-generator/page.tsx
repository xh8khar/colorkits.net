import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Hard Light Generator - Free Online Color Tool | ColorKits',
  description: 'Generate hard light for your design projects. Free online hard light with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['hard light', 'hard light generator', 'hard light tool', 'hard light online', 'color generator'],
  openGraph: {
    title: 'Hard Light Generator - Free Online Color Tool | ColorKits',
    description: 'Generate hard light for your design projects.',
  },
  twitter: {
    title: 'Hard Light Generator - Free Online Color Tool | ColorKits',
    description: 'Generate hard light for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
