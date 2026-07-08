import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Background Gradient Generator - Free Online Color Tool | ColorKits',
  description: 'Generate and explore background gradient generator for your design projects. Free online tool for designers and developers. Create beautiful color combinations with real-time preview.',
  keywords: ['background gradient generator', 'background gradient generator tool', 'background gradient generator online', 'background gradient generator color tool'],
  openGraph: {
    title: 'Background Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore background gradient generator for your design projects.',
  },
  twitter: {
    title: 'Background Gradient Generator - Free Online Color Tool | ColorKits',
    description: 'Generate and explore background gradient generator for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
