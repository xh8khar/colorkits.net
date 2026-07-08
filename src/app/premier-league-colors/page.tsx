import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Premier League Team Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore premier league team colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['premier league colors', 'premier league colors tool', 'premier league colors online', 'premier league colors color tool'],
  openGraph: {
    title: 'Premier League Team Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore premier league team colors for your design projects.',
  },
  twitter: {
    title: 'Premier League Team Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore premier league team colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
