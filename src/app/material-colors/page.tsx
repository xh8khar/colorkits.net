import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Material Design Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore material design colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['material colors', 'material colors tool', 'material colors online', 'material colors color tool'],
  openGraph: {
    title: 'Material Design Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore material design colors reference for your design projects.',
  },
  twitter: {
    title: 'Material Design Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore material design colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
