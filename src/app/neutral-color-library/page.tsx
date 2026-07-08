import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Neutral Color Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore neutral color library for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.',
  keywords: ['neutral color library', 'neutral color library tool', 'neutral color library online', 'neutral color library color tool'],
  openGraph: {
    title: 'Neutral Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore neutral color library for your design projects.',
  },
  twitter: {
    title: 'Neutral Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore neutral color library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
