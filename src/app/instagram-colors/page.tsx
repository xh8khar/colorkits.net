import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Instagram Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore instagram brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['instagram colors', 'instagram colors tool', 'instagram colors online', 'instagram colors color tool'],
  openGraph: {
    title: 'Instagram Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore instagram brand colors for your design projects.',
  },
  twitter: {
    title: 'Instagram Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore instagram brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
