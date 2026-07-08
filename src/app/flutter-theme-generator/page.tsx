import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Flutter Theme Generator - Free Online Color Tool | ColorKits',
  description: 'Generate flutter theme for your projects. Free online flutter theme with customizable options. Create complete color schemes for applications and websites with real-time preview.',
  keywords: ['flutter theme', 'flutter theme generator', 'theme generator', 'color theme generator', 'flutter theme theme'],
  openGraph: {
    title: 'Flutter Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate flutter theme for your projects.',
  },
  twitter: {
    title: 'Flutter Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate flutter theme for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
