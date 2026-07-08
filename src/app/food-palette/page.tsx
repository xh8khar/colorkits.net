import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Food Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning food palette color schemes instantly. Free online food palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['food palette', 'food palette tool', 'food palette online', 'food palette color tool'],
  openGraph: {
    title: 'Food Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning food palette color schemes instantly.',
  },
  twitter: {
    title: 'Food Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning food palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
