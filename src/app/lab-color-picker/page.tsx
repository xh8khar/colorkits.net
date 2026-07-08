import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LAB Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick LAB color space values with an interactive picker. Free online CIELAB color picker for designers working with device-independent color representation.',
  keywords: ['lab color picker', 'lab color picker tool', 'lab color picker online', 'lab color picker color tool'],
  openGraph: {
    title: 'LAB Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick LAB color space values with an interactive picker.',
  },
  twitter: {
    title: 'LAB Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick LAB color space values with an interactive picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
