import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Brightness Adjuster - Free Online Color Tool | ColorKits',
  description: 'Adjust brightness adjuster with precision controls for your design projects. Free online brightness adjuster for designers and developers. Fine-tune color properties with real-time preview and exact value controls.',
  keywords: ['brightness adjuster', 'brightness adjuster tool', 'brightness adjuster online', 'color adjuster', 'color fine tuner'],
  openGraph: {
    title: 'Brightness Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust brightness adjuster with precision controls for your design projects.',
  },
  twitter: {
    title: 'Brightness Adjuster - Free Online Color Tool | ColorKits',
    description: 'Adjust brightness adjuster with precision controls for your design projects.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
