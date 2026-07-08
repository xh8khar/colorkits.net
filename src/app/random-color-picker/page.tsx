import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'Random Color Picker - Free Online Color Tool | ColorKits',
  description: 'Discover random colors with a fun interactive picker. Free online random color picker for inspiration and exploration. Generate surprise colors with one click.',
  keywords: ['random color picker', 'random color picker tool', 'random color picker online', 'random color picker color tool'],
  openGraph: {
    title: 'Random Color Picker - Free Online Color Tool | ColorKits',
    description: 'Discover random colors with a fun interactive picker.',
  },
  twitter: {
    title: 'Random Color Picker - Free Online Color Tool | ColorKits',
    description: 'Discover random colors with a fun interactive picker.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
