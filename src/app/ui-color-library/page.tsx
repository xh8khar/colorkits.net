import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'UI Color Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore ui color library for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.',
  keywords: ['ui color library', 'ui color library tool', 'ui color library online', 'ui color library color tool'],
  openGraph: {
    title: 'UI Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore ui color library for your design projects.',
  },
  twitter: {
    title: 'UI Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore ui color library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
