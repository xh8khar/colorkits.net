import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Vibrance Adjuster - Free Online Color Tool | ColorKits',
  description: 'Adjust vibrance adjuster with precision controls for your design projects. Free online vibrance adjuster for designers and developers. Fine-tune color properties with real-time preview and exact value controls.',
  keywords: ['vibrance adjuster', 'vibrance adjuster tool', 'vibrance adjuster online', 'color adjuster', 'color fine tuner'],
  openGraph: {
    title: 'Vibrance Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust vibrance adjuster with precision controls for your design projects.',
  },
  twitter: {
    title: 'Vibrance Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust vibrance adjuster with precision controls for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
