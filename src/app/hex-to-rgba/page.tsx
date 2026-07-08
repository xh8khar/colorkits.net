import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to RGBA Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to RGBA values with alpha channel. Free online HEX to RGBA converter for web developers and designers. Supports transparency in color conversion with real-time preview.',
  keywords: ['hex to rgba', 'hex to rgba converter', 'rgba converter', 'hex with alpha', 'hex to rgba color'],
  openGraph: {
    title: 'HEX to RGBA Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to RGBA values with alpha channel.',
  },
  twitter: {
    title: 'HEX to RGBA Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to RGBA values with alpha channel.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
