import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Apple Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore apple brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['apple colors', 'apple colors tool', 'apple colors online', 'apple colors color tool'],
  openGraph: {
    title: 'Apple Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore apple brand colors for your design projects.',
  },
  twitter: {
    title: 'Apple Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore apple brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
