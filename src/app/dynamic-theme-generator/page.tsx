import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dynamic Theme Generator - Free Online Color Tool | ColorKits',
  description: 'Generate dynamic theme for your projects. Free online dynamic theme with customizable options. Create complete color schemes for applications and websites with real-time preview.',
  keywords: ['dynamic theme', 'dynamic theme generator', 'theme generator', 'color theme generator', 'dynamic theme theme'],
  openGraph: {
    title: 'Dynamic Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate dynamic theme for your projects.',
  },
  twitter: {
    title: 'Dynamic Theme Generator - Free Online Color Tool | ColorKits',
    description: 'Generate dynamic theme for your projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
