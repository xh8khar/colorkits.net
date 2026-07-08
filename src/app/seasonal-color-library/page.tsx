import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Seasonal Color Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore seasonal color library for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.',
  keywords: ['seasonal color library', 'seasonal color library tool', 'seasonal color library online', 'seasonal color library color tool'],
  openGraph: {
    title: 'Seasonal Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore seasonal color library for your design projects.',
  },
  twitter: {
    title: 'Seasonal Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore seasonal color library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
