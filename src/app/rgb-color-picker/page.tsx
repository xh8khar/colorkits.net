import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick RGB colors with an interactive color picker. Free online RGB color picker for web developers and designers. Select colors visually and get rgb() values instantly with live preview.',
  keywords: ['rgb color picker', 'rgb color picker tool', 'rgb color picker online', 'rgb color picker color tool'],
  openGraph: {
    title: 'RGB Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick RGB colors with an interactive color picker.',
  },
  twitter: {
    title: 'RGB Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick RGB colors with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
