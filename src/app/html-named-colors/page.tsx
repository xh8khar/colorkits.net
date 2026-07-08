import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HTML Named Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore html named colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['html named colors', 'html named colors tool', 'html named colors online', 'html named colors color tool'],
  openGraph: {
    title: 'HTML Named Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore html named colors reference for your design projects.',
  },
  twitter: {
    title: 'HTML Named Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore html named colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
