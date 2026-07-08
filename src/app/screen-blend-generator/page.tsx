import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Screen Blend Generator - Free Online Color Tool | ColorKits',
  description: 'Generate screen blend for your design projects. Free online screen blend with customizable options. Create beautiful color combinations and effects with real-time preview and export features.',
  keywords: ['screen blend', 'screen blend generator', 'screen blend tool', 'screen blend online', 'color generator'],
  openGraph: {
    title: 'Screen Blend Generator - Free Online Color Tool | ColorKits',
    description: 'Generate screen blend for your design projects.',
  },
  twitter: {
    title: 'Screen Blend Generator - Free Online Color Tool | ColorKits',
    description: 'Generate screen blend for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
