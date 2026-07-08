import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Semantic Color Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore semantic color library for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.',
  keywords: ['semantic color library', 'semantic color library tool', 'semantic color library online', 'semantic color library color tool'],
  openGraph: {
    title: 'Semantic Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore semantic color library for your design projects.',
  },
  twitter: {
    title: 'Semantic Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore semantic color library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
