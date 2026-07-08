import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Monochromatic Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning monochromatic palette color schemes instantly. Free online monochromatic palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['monochromatic palette', 'monochromatic palette tool', 'monochromatic palette online', 'monochromatic palette color tool'],
  openGraph: {
    title: 'Monochromatic Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning monochromatic palette color schemes instantly.',
  },
  twitter: {
    title: 'Monochromatic Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning monochromatic palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
