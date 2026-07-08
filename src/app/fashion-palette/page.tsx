import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Fashion Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning fashion palette color schemes instantly. Free online fashion palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['fashion palette', 'fashion palette tool', 'fashion palette online', 'fashion palette color tool'],
  openGraph: {
    title: 'Fashion Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning fashion palette color schemes instantly.',
  },
  twitter: {
    title: 'Fashion Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning fashion palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
