import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Design Token Generator - Free Online Color Tool | ColorKits',
  description: 'Generate design token for your design projects. Free online design token with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['design token', 'design token generator', 'design token tool', 'design token online', 'color generator'],
  openGraph: {
    title: 'Design Token Generator - Free Online Color Tool | ColorKits',
    description: 'Generate design token for your design projects.',
  },
  twitter: {
    title: 'Design Token Generator - Free Online Color Tool | ColorKits',
    description: 'Generate design token for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
