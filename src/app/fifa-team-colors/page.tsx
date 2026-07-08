import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'FIFA World Cup Team Colors - Free Online Color Tool | ColorKits',
  description: 'Browse and explore fifa world cup team colors for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['fifa team colors', 'fifa team colors tool', 'fifa team colors online', 'fifa team colors color tool'],
  openGraph: {
    title: 'FIFA World Cup Team Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore fifa world cup team colors for your design projects.',
  },
  twitter: {
    title: 'FIFA World Cup Team Colors - Free Online Color Tool | ColorKits',
    description: 'Browse and explore fifa world cup team colors for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
