import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CMYK Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick CMYK colors for print design with an interactive picker. Free online CMYK color picker for graphic designers preparing artwork for print production.',
  keywords: ['cmyk color picker', 'cmyk color picker tool', 'cmyk color picker online', 'cmyk color picker color tool'],
  openGraph: {
    title: 'CMYK Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick CMYK colors for print design with an interactive picker.',
  },
  twitter: {
    title: 'CMYK Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick CMYK colors for print design with an interactive picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
