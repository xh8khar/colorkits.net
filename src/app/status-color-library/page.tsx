import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Status Color Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore status color library for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.',
  keywords: ['status color library', 'status color library tool', 'status color library online', 'status color library color tool'],
  openGraph: {
    title: 'Status Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore status color library for your design projects.',
  },
  twitter: {
    title: 'Status Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore status color library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
