import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSV Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick HSV colors with an interactive color picker. Free online HSV color picker for designers and developers. Select colors visually with hue, saturation, and value controls.',
  keywords: ['hsv color picker', 'hsv color picker tool', 'hsv color picker online', 'hsv color picker color tool'],
  openGraph: {
    title: 'HSV Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HSV colors with an interactive color picker.',
  },
  twitter: {
    title: 'HSV Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HSV colors with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
