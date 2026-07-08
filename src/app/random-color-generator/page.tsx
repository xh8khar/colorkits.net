import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Random Color Generator - Free Online Color Tool | ColorKits',
  description: 'Generate random color for your design projects. Free online random color with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['random color', 'random color generator', 'random color tool', 'random color online', 'color generator'],
  openGraph: {
    title: 'Random Color Generator - Free Online Color Tool | ColorKits',
    description: 'Generate random color for your design projects.',
  },
  twitter: {
    title: 'Random Color Generator - Free Online Color Tool | ColorKits',
    description: 'Generate random color for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
