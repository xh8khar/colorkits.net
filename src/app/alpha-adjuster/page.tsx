import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Alpha Adjuster - Free Online Color Tool | ColorKits',
  description: 'Adjust alpha adjuster with precision controls for your design projects. Free online alpha adjuster for designers and developers. Fine-tune color properties with real-time preview and exact value controls.',
  keywords: ['alpha adjuster', 'alpha adjuster tool', 'alpha adjuster online', 'color adjuster', 'color fine tuner'],
  openGraph: {
    title: 'Alpha Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust alpha adjuster with precision controls for your design projects.',
  },
  twitter: {
    title: 'Alpha Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust alpha adjuster with precision controls for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
