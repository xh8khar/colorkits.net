import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Website Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick and identify colors with a precision website color picker. Free online website color picker for web developers and designers. Select colors visually and get instant color values in multiple formats.',
  keywords: ['website color picker', 'website color picker tool', 'website color picker online', 'color picker', 'color selector'],
  openGraph: {
    title: 'Website Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick and identify colors with a precision website color picker.',
  },
  twitter: {
    title: 'Website Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick and identify colors with a precision website color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
