import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Microsoft Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore microsoft brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['microsoft colors', 'microsoft colors tool', 'microsoft colors online', 'microsoft colors color tool'],
  openGraph: {
    title: 'Microsoft Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore microsoft brand colors for your design projects.',
  },
  twitter: {
    title: 'Microsoft Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore microsoft brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
