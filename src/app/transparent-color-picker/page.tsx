import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Transparent Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick transparent and semi-transparent colors visually. Free online transparent color picker for designers and developers working with opacity and alpha channels.',
  keywords: ['transparent color picker', 'transparent color picker tool', 'transparent color picker online', 'transparent color picker color tool'],
  openGraph: {
    title: 'Transparent Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick transparent and semi-transparent colors visually.',
  },
  twitter: {
    title: 'Transparent Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick transparent and semi-transparent colors visually.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
