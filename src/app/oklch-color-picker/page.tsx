import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLCH Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick OKLCH color values with an interactive color picker. Free online OKLCH color picker for modern CSS Color Level 4 with perceptually uniform color selection.',
  keywords: ['oklch color picker', 'oklch color picker tool', 'oklch color picker online', 'oklch color picker color tool'],
  openGraph: {
    title: 'OKLCH Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick OKLCH color values with an interactive color picker.',
  },
  twitter: {
    title: 'OKLCH Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick OKLCH color values with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
