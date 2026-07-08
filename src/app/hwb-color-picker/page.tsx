import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HWB Color Picker - Free Online Color Tool | ColorKits',
  description: 'Pick HWB colors with an interactive color picker. Free online HWB color picker supporting CSS Color Module Level 4 format. Select colors with whiteness and blackness controls.',
  keywords: ['hwb color picker', 'hwb color picker tool', 'hwb color picker online', 'hwb color picker color tool'],
  openGraph: {
    title: 'HWB Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HWB colors with an interactive color picker.',
  },
  twitter: {
    title: 'HWB Color Picker - Free Online Color Tool | ColorKits',
    description: 'Pick HWB colors with an interactive color picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
