import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'SCSS Variables Generator - Free Online Color Tool | ColorKits',
  description: 'Generate scss variables for your design projects. Free online scss variables with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['scss variables', 'scss variables generator', 'scss variables tool', 'scss variables online', 'color generator'],
  openGraph: {
    title: 'SCSS Variables Generator - Free Online Color Tool | ColorKits',
    description: 'Generate scss variables for your design projects.',
  },
  twitter: {
    title: 'SCSS Variables Generator - Free Online Color Tool | ColorKits',
    description: 'Generate scss variables for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
