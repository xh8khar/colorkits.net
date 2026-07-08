import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Dark Theme Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning dark theme palette color schemes instantly. Free online dark theme palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['dark theme palette', 'dark theme palette tool', 'dark theme palette online', 'dark theme palette color tool'],
  openGraph: {
    title: 'Dark Theme Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning dark theme palette color schemes instantly.',
  },
  twitter: {
    title: 'Dark Theme Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning dark theme palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
