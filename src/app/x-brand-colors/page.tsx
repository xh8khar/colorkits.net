import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'X (Twitter) Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore x (twitter) brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['x brand colors', 'x brand colors tool', 'x brand colors online', 'x brand colors color tool'],
  openGraph: {
    title: 'X (Twitter) Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore x (twitter) brand colors for your design projects.',
  },
  twitter: {
    title: 'X (Twitter) Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore x (twitter) brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
