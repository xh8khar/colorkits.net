import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Complementary Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning complementary palette color schemes instantly. Free online complementary palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['complementary palette', 'complementary palette tool', 'complementary palette online', 'complementary palette color tool'],
  openGraph: {
    title: 'Complementary Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning complementary palette color schemes instantly.',
  },
  twitter: {
    title: 'Complementary Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning complementary palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
