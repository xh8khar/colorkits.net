import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'NBA Team Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore nba team colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['nba team colors', 'nba team colors tool', 'nba team colors online', 'nba team colors color tool'],
  openGraph: {
    title: 'NBA Team Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore nba team colors reference for your design projects.',
  },
  twitter: {
    title: 'NBA Team Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore nba team colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
