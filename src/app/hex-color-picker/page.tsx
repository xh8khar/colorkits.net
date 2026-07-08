import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick HEX color codes with an interactive color picker. Free online HEX color picker for web developers and designers. Select colors visually and get instant HEX values with real-time preview.',
  keywords: ['hex color picker', 'hex color picker tool', 'hex color picker online', 'hex color picker color tool'],
  openGraph: {
    title: 'HEX Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HEX color codes with an interactive color picker.',
  },
  twitter: {
    title: 'HEX Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HEX color codes with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
