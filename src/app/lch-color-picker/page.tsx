import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LCH Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick LCH color values with an interactive color picker. Free online LCH color picker for CSS Color Level 4 and advanced color science applications.',
  keywords: ['lch color picker', 'lch color picker tool', 'lch color picker online', 'lch color picker color tool'],
  openGraph: {
    title: 'LCH Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick LCH color values with an interactive color picker.',
  },
  twitter: {
    title: 'LCH Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick LCH color values with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
