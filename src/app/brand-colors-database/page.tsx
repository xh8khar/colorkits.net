import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brand Colors Database - Free Online Color Tool | ColorKits',
  description: 'Browse and explore brand colors database for your design projects. Free online brand colors database reference tool for designers and developers. Find colors with search, filter, and copy-ready color values.',
  keywords: ['brand colors database', 'brand colors database reference', 'brand colors database library', 'brand colors database online', 'color reference'],
  openGraph: {
    title: 'Brand Colors Database - Free Online Color Tool | ColorKits',
    description: 'Browse and explore brand colors database for your design projects.',
  },
  twitter: {
    title: 'Brand Colors Database - Free Online Color Tool | ColorKits',
    description: 'Browse and explore brand colors database for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
