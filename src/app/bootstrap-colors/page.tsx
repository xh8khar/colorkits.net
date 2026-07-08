import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Bootstrap Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore bootstrap colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['bootstrap colors', 'bootstrap colors tool', 'bootstrap colors online', 'bootstrap colors color tool'],
  openGraph: {
    title: 'Bootstrap Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore bootstrap colors reference for your design projects.',
  },
  twitter: {
    title: 'Bootstrap Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore bootstrap colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
