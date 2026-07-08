import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Multi Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick multiple colors simultaneously with an advanced color picker. Free online multi-color picker for building color palettes and comparing color values side by side.',
  keywords: ['multi color picker', 'multi color picker tool', 'multi color picker online', 'multi color picker color tool'],
  openGraph: {
    title: 'Multi Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick multiple colors simultaneously with an advanced color picker.',
  },
  twitter: {
    title: 'Multi Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick multiple colors simultaneously with an advanced color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
