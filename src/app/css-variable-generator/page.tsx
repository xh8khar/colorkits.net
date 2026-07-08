import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Variable Generator - Free Online Color Tool | ColorKits',
  description: 'Generate css variable for your design projects. Free online css variable with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['css variable', 'css variable generator', 'css variable tool', 'css variable online', 'color generator'],
  openGraph: {
    title: 'CSS Variable Generator - Free Online Color Tool | ColorKits',
    description: 'Generate css variable for your design projects.',
  },
  twitter: {
    title: 'CSS Variable Generator - Free Online Color Tool | ColorKits',
    description: 'Generate css variable for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
