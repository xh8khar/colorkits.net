import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pantone Finder - Free Online Color Tool | ColorKits',
  description: 'Find Pantone colors and match them to digital color values. Free online Pantone color finder for graphic designers. Look up Pantone formulas with HEX, RGB, and CMYK equivalents.',
  keywords: ['pantone finder', 'pantone colors', 'pantone color lookup', 'pantone to hex', 'pantone color finder'],
  openGraph: {
    title: 'Pantone Finder - Free Online Color Tool | ColorKits',
    description: 'Find Pantone colors and match them to digital color values.',
  },
  twitter: {
    title: 'Pantone Finder - Free Online Color Tool | ColorKits',
    description: 'Find Pantone colors and match them to digital color values.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
