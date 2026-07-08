import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Web Safe Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore web safe colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['web safe colors', 'web safe colors tool', 'web safe colors online', 'web safe colors color tool'],
  openGraph: {
    title: 'Web Safe Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore web safe colors reference for your design projects.',
  },
  twitter: {
    title: 'Web Safe Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore web safe colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
