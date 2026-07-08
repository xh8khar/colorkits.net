import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Gradient Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick and create gradient colors with an interactive picker. Free online gradient color picker for designing smooth color transitions and multi-stop gradients.',
  keywords: ['gradient color picker', 'gradient color picker tool', 'gradient color picker online', 'gradient color picker color tool'],
  openGraph: {
    title: 'Gradient Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick and create gradient colors with an interactive picker.',
  },
  twitter: {
    title: 'Gradient Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick and create gradient colors with an interactive picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
