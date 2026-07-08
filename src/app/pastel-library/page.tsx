import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pastel Color Library - Free Online Color Tool | ColorKits',
  description: 'Browse and explore pastel color library for your design projects. Free online color reference tool for designers and developers. Find the perfect colors with search, filter, and copy-ready color values.',
  keywords: ['pastel library', 'pastel library tool', 'pastel library online', 'pastel library color tool'],
  openGraph: {
    title: 'Pastel Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore pastel color library for your design projects.',
  },
  twitter: {
    title: 'Pastel Color Library - Free Online Color Tool | ColorKits',
    description: 'Browse and explore pastel color library for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
