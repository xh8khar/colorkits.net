import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Saturation Adjuster - Free Online Color Tool | ColorKits',
  description: 'Adjust saturation adjuster with precision controls for your design projects. Free online saturation adjuster for designers and developers. Fine-tune color properties with real-time preview and exact value controls.',
  keywords: ['saturation adjuster', 'saturation adjuster tool', 'saturation adjuster online', 'color adjuster', 'color fine tuner'],
  openGraph: {
    title: 'Saturation Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust saturation adjuster with precision controls for your design projects.',
  },
  twitter: {
    title: 'Saturation Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust saturation adjuster with precision controls for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
