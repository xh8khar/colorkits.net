import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CSS Color Names Search - Free Online Color Tool | ColorKits',
  description: 'Find the name of any color by its HEX or RGB value. Free online color name finder for designers and developers. Identify HTML color names, CSS named colors, and custom color names.',
  keywords: ['color name finder', 'color names', 'find color name', 'color name lookup', 'html color names'],
  openGraph: {
    title: 'CSS Color Names Search - Free Online Color Tool | ColorKits',
    description: 'Find the name of any color by its HEX or RGB value.',
  },
  twitter: {
    title: 'CSS Color Names Search - Free Online Color Tool | ColorKits',
    description: 'Find the name of any color by its HEX or RGB value.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
