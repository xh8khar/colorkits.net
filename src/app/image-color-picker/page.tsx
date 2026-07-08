import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Image Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick colors from uploaded images with precision. Free online image color picker for designers and developers. Extract color values from photos, illustrations, and graphics.',
  keywords: ['image color picker', 'image color picker tool', 'image color picker online', 'image color picker color tool'],
  openGraph: {
    title: 'Image Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors from uploaded images with precision.',
  },
  twitter: {
    title: 'Image Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors from uploaded images with precision.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
