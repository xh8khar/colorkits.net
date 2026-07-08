import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to RGB values instantly. Free online HEX to RGB converter for web developers and designers. Supports #RRGGBB, #RGB, and 8-digit HEX formats with real-time preview.',
  keywords: ['hex to rgb', 'hex to rgb converter', 'hex color converter', 'hex code to rgb', 'hex to rgb calculator'],
  openGraph: {
    title: 'HEX to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to RGB values instantly.',
  },
  twitter: {
    title: 'HEX to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to RGB values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
