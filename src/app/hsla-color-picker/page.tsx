import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSLA Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick HSLA colors with alpha channel support. Free online HSLA color picker for web developers and designers. Select colors with transparency and get hsla() values instantly.',
  keywords: ['hsla color picker', 'hsla color picker tool', 'hsla color picker online', 'hsla color picker color tool'],
  openGraph: {
    title: 'HSLA Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HSLA colors with alpha channel support.',
  },
  twitter: {
    title: 'HSLA Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HSLA colors with alpha channel support.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
