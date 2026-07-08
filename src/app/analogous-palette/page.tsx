import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Analogous Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning analogous palette color schemes instantly. Free online analogous palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['analogous palette', 'analogous palette tool', 'analogous palette online', 'analogous palette color tool'],
  openGraph: {
    title: 'Analogous Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning analogous palette color schemes instantly.',
  },
  twitter: {
    title: 'Analogous Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning analogous palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
