import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Tetradic Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning tetradic palette color schemes instantly. Free online tetradic palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['tetradic palette', 'tetradic palette tool', 'tetradic palette online', 'tetradic palette color tool'],
  openGraph: {
    title: 'Tetradic Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning tetradic palette color schemes instantly.',
  },
  twitter: {
    title: 'Tetradic Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning tetradic palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
