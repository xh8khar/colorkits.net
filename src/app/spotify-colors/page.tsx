import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Spotify Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore spotify brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['spotify colors', 'spotify colors tool', 'spotify colors online', 'spotify colors color tool'],
  openGraph: {
    title: 'Spotify Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore spotify brand colors for your design projects.',
  },
  twitter: {
    title: 'Spotify Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore spotify brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
