import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSL Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick HSL colors with an interactive color picker. Free online HSL color picker for web developers and designers. Select colors visually and get hsl() values with real-time preview.',
  keywords: ['hsl color picker', 'hsl color picker tool', 'hsl color picker online', 'hsl color picker color tool'],
  openGraph: {
    title: 'HSL Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HSL colors with an interactive color picker.',
  },
  twitter: {
    title: 'HSL Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HSL colors with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
