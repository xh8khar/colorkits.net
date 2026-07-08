import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Light Theme Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning light theme palette color schemes instantly. Free online light theme palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['light theme palette', 'light theme palette tool', 'light theme palette online', 'light theme palette color tool'],
  openGraph: {
    title: 'Light Theme Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning light theme palette color schemes instantly.',
  },
  twitter: {
    title: 'Light Theme Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning light theme palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
