import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Retro Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning retro palette generator color schemes instantly. Free online retro palette generator for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['retro palette generator', 'retro palette generator tool', 'retro palette generator online', 'retro palette generator color tool'],
  openGraph: {
    title: 'Retro Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning retro palette generator color schemes instantly.',
  },
  twitter: {
    title: 'Retro Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning retro palette generator color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
