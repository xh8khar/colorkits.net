import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Swift Color Assets Generator - Free Online Color Tool | ColorKits',
  description: 'Generate swift color assets for your design projects. Free online swift color assets with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['swift color assets', 'swift color assets generator', 'swift color assets tool', 'swift color assets online', 'color generator'],
  openGraph: {
    title: 'Swift Color Assets Generator - Free Online Color Tool | ColorKits',
    description: 'Generate swift color assets for your design projects.',
  },
  twitter: {
    title: 'Swift Color Assets Generator - Free Online Color Tool | ColorKits',
    description: 'Generate swift color assets for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
