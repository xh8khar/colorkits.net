import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Temperature Adjuster - Free Online Color Tool | ColorKits',
  description: 'Adjust temperature adjuster with precision controls for your design projects. Free online temperature adjuster for designers and developers. Fine-tune color properties with real-time preview and exact value controls.',
  keywords: ['temperature adjuster', 'temperature adjuster tool', 'temperature adjuster online', 'color adjuster', 'color fine tuner'],
  openGraph: {
    title: 'Temperature Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust temperature adjuster with precision controls for your design projects.',
  },
  twitter: {
    title: 'Temperature Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust temperature adjuster with precision controls for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
