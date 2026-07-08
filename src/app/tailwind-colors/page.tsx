import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tailwind CSS Colors Reference - Free Online Color Tool | ColorKits',
  description: 'Browse and explore tailwind css colors reference for your design projects. Free online reference tool for designers and developers. Find and copy exact brand color values with HEX, RGB, and HSL codes.',
  keywords: ['tailwind colors', 'tailwind colors tool', 'tailwind colors online', 'tailwind colors color tool'],
  openGraph: {
    title: 'Tailwind CSS Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore tailwind css colors reference for your design projects.',
  },
  twitter: {
    title: 'Tailwind CSS Colors Reference - Free Online Color Tool | ColorKits',
    description: 'Browse and explore tailwind css colors reference for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
