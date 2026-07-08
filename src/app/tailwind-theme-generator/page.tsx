import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tailwind Theme Generator - Free Online Color Tool | ColorKits',
  description: 'Generate tailwind theme for your projects. Free online tailwind theme with customizable options. Create complete color schemes for applications and websites with real-time preview.',
  keywords: ['tailwind theme', 'tailwind theme generator', 'theme generator', 'color theme generator', 'tailwind theme theme'],
  openGraph: {
    title: 'Tailwind Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tailwind theme for your projects.',
  },
  twitter: {
    title: 'Tailwind Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate tailwind theme for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
