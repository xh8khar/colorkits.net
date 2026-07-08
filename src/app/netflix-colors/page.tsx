import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Netflix Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore netflix brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['netflix colors', 'netflix colors tool', 'netflix colors online', 'netflix colors color tool'],
  openGraph: {
    title: 'Netflix Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore netflix brand colors for your design projects.',
  },
  twitter: {
    title: 'Netflix Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore netflix brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
