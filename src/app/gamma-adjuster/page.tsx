import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gamma Adjuster - Free Online Color Tool | ColorKits',
  description: 'Adjust gamma adjuster with precision controls for your design projects. Free online gamma adjuster for designers and developers. Fine-tune color properties with real-time preview and exact value controls.',
  keywords: ['gamma adjuster', 'gamma adjuster tool', 'gamma adjuster online', 'color adjuster', 'color fine tuner'],
  openGraph: {
    title: 'Gamma Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust gamma adjuster with precision controls for your design projects.',
  },
  twitter: {
    title: 'Gamma Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust gamma adjuster with precision controls for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
