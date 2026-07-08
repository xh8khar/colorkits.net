import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'YouTube Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore youtube brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['youtube colors', 'youtube colors tool', 'youtube colors online', 'youtube colors color tool'],
  openGraph: {
    title: 'YouTube Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore youtube brand colors for your design projects.',
  },
  twitter: {
    title: 'YouTube Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore youtube brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
