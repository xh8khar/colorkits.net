import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Wheel - Free Online Color Tool | ColorKits',
  description: 'Explore color relationships with an interactive color wheel. Free online color wheel for designers and artists. Visualize hue, saturation, and color harmony relationships with real-time updates.',
  keywords: ['color wheel', 'color wheel tool', 'color harmony wheel', 'color relationships', 'color wheel online'],
  openGraph: {
    title: 'Color Wheel - Free Online Color Tool | ColorKits',
    description: 'Explore color relationships with an interactive color wheel.',
  },
  twitter: {
    title: 'Color Wheel - Free Online Color Tool | ColorKits',
    description: 'Explore color relationships with an interactive color wheel.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
