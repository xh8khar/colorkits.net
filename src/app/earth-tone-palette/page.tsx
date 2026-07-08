import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Earth Tone Color Palette - Free Online Color Tool | ColorKits',
  description: 'Generate stunning earth tone palette color schemes instantly. Free online earth tone palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['earth tone palette', 'earth tone palette tool', 'earth tone palette online', 'earth tone palette color tool'],
  openGraph: {
    title: 'Earth Tone Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning earth tone palette color schemes instantly.',
  },
  twitter: {
    title: 'Earth Tone Color Palette - Free Online Color Tool | ColorKits',
    description: 'Generate stunning earth tone palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
