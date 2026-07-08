import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Split Complementary Palette Generator - Free Online Color Tool | ColorKits',
  description: 'Generate stunning split complementary palette color schemes instantly. Free online split complementary palette for designers and developers. Create harmonious color combinations with real-time preview and export options.',
  keywords: ['split complementary palette', 'split complementary palette tool', 'split complementary palette online', 'split complementary palette color tool'],
  openGraph: {
    title: 'Split Complementary Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning split complementary palette color schemes instantly.',
  },
  twitter: {
    title: 'Split Complementary Palette Generator - Free Online Color Tool | ColorKits',
    description: 'Generate stunning split complementary palette color schemes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
