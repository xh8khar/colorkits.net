import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Named Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore css named colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['css named colors', 'css named colors tool', 'css named colors online', 'css named colors color tool'],
  openGraph: {
    title: 'CSS Named Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore css named colors reference for your design projects.',
  },
  twitter: {
    title: 'CSS Named Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore css named colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
