import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Alpha Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick colors with alpha channel and transparency controls. Free online alpha color picker for designers and developers working with RGBA, HSLA, and opacity values.',
  keywords: ['alpha color picker', 'alpha color picker tool', 'alpha color picker online', 'alpha color picker color tool'],
  openGraph: {
    title: 'Alpha Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors with alpha channel and transparency controls.',
  },
  twitter: {
    title: 'Alpha Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors with alpha channel and transparency controls.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
