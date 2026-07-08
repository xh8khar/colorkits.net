import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Design Tokens Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore design tokens library for your design projects. Free online design tokens library reference tool for designers and developers. Find colors with search, filter, and copy-ready color values.',
  keywords: ['design tokens library', 'design tokens library reference', 'design tokens library library', 'design tokens library online', 'color reference'],
  openGraph: {
    title: 'Design Tokens Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore design tokens library for your design projects.',
  },
  twitter: {
    title: 'Design Tokens Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore design tokens library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
