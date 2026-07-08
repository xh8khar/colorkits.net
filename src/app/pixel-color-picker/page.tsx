import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Pixel Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick individual pixel colors from images with precision zoom. Free online pixel color picker for detailed color analysis and extraction from digital images.',
  keywords: ['pixel color picker', 'pixel color picker tool', 'pixel color picker online', 'pixel color picker color tool'],
  openGraph: {
    title: 'Pixel Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick individual pixel colors from images with precision zoom.',
  },
  twitter: {
    title: 'Pixel Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick individual pixel colors from images with precision zoom.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
