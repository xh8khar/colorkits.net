import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Screen Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick colors from anywhere on your screen. Free online screen color picker for designers and developers. Identify and capture color values from any application or website.',
  keywords: ['screen color picker', 'screen color picker tool', 'screen color picker online', 'screen color picker color tool'],
  openGraph: {
    title: 'Screen Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors from anywhere on your screen.',
  },
  twitter: {
    title: 'Screen Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick colors from anywhere on your screen.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
