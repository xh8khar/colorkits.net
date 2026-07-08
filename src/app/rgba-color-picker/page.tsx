import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGBA Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick RGBA colors with alpha channel support. Free online RGBA color picker for web developers and designers. Select colors with transparency and get rgba() values.',
  keywords: ['rgba color picker', 'rgba color picker tool', 'rgba color picker online', 'rgba color picker color tool'],
  openGraph: {
    title: 'RGBA Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick RGBA colors with alpha channel support.',
  },
  twitter: {
    title: 'RGBA Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick RGBA colors with alpha channel support.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
