import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick and identify colors from anywhere with a precision color picker. Free online color picker for web developers and designers. Select colors visually and get instant values in multiple formats.',
  keywords: ['color picker', 'color picker tool', 'color picker online', 'color picker color tool'],
  openGraph: {
    title: 'Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick and identify colors from anywhere with a precision color picker.',
  },
  twitter: {
    title: 'Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick and identify colors from anywhere with a precision color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
