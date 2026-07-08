import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Discord Brand Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore discord brand colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['discord colors', 'discord colors tool', 'discord colors online', 'discord colors color tool'],
  openGraph: {
    title: 'Discord Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore discord brand colors for your design projects.',
  },
  twitter: {
    title: 'Discord Brand Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore discord brand colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
