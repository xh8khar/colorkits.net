import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Ocean Color Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning ocean palette generator color schemes instantly. Free online ocean palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['ocean palette generator', 'ocean palette generator tool', 'ocean palette generator online', 'ocean palette generator color tool'],
  openGraph: {
    title: 'Ocean Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning ocean palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Ocean Color Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning ocean palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
