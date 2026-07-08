import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Android Colors XML Generator - Free Online Color Tool | ColorKits',
  description: 'Generate android colors xml for your design projects. Free online android colors xml with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['android colors xml', 'android colors xml generator', 'android colors xml tool', 'android colors xml online', 'color generator'],
  openGraph: {
    title: 'Android Colors XML Generator - Free Online Color Tool | ColorKits',
    description: 'Generate android colors xml for your design projects.',
  },
  twitter: {
    title: 'Android Colors XML Generator - Free Online Color Tool | ColorKits',
    description: 'Generate android colors xml for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
