import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Theme Generator - Free Online Color Tool | ColorKits',
  description: 'Generate image theme for your projects. Free online image theme with customizable options. Create complete color schemes for applications and websites with real-time preview.',
  keywords: ['image theme', 'image theme generator', 'theme generator', 'color theme generator', 'image theme theme'],
  openGraph: {
    title: 'Image Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate image theme for your projects.',
  },
  twitter: {
    title: 'Image Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate image theme for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
