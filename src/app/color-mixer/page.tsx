import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Mixer - Free Online Color Tool | ColorKits',
  description: 'Mix colors together to create new custom shades. Free online color mixer for designers and artists. Blend two or more colors with adjustable ratios and real-time preview.',
  keywords: ['color mixer', 'color mixer', 'color blender', 'color mixer tool', 'mix colors online'],
  openGraph: {
    title: 'Color Mixer - Free Online Color Tool | ColorKits',
    description: 'Mix colors together to create new custom shades.',
  },
  twitter: {
    title: 'Color Mixer - Free Online Color Tool | ColorKits',
    description: 'Mix colors together to create new custom shades.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
