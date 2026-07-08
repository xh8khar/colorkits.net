import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Invert Color - Free Online Color Tool | ColorKits',
  description: 'Invert any color to its opposite on the color wheel. Free online color inverter for designers and developers. Get accurate complementary and inverted colors with real-time preview.',
  keywords: ['invert color', 'color inverter', 'inverse color', 'complementary color', 'color invert tool'],
  openGraph: {
    title: 'Invert Color - Free Online Color Tool | ColorKits',
    description: 'Invert any color to its opposite on the color wheel.',
  },
  twitter: {
    title: 'Invert Color - Free Online Color Tool | ColorKits',
    description: 'Invert any color to its opposite on the color wheel.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
