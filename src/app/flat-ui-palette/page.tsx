import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Flat UI Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning flat ui palette color schemes instantly. Free online flat ui palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['flat ui palette', 'flat ui palette tool', 'flat ui palette online', 'flat ui palette color tool'],
  openGraph: {
    title: 'Flat UI Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning flat ui palette color schemes instantly.',
  },
  twitter: {
    title: 'Flat UI Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning flat ui palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
