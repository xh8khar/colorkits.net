import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Luxury Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning luxury palette color schemes instantly. Free online luxury palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['luxury palette', 'luxury palette tool', 'luxury palette online', 'luxury palette color tool'],
  openGraph: {
    title: 'Luxury Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning luxury palette color schemes instantly.',
  },
  twitter: {
    title: 'Luxury Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning luxury palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
