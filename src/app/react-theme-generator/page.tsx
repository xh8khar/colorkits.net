import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'React Theme Generator - Free Online Color Tool | ColorKits',
  description: 'Generate react theme for your projects. Free online react theme with customizable options. Create complete color schemes for applications and websites with real-time preview.',
  keywords: ['react theme', 'react theme generator', 'theme generator', 'color theme generator', 'react theme theme'],
  openGraph: {
    title: 'React Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate react theme for your projects.',
  },
  twitter: {
    title: 'React Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate react theme for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
