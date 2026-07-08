import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Google Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore google brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['google colors', 'google colors tool', 'google colors online', 'google colors color tool'],
  openGraph: {
    title: 'Google Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore google brand colors for your design projects.',
  },
  twitter: {
    title: 'Google Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore google brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
