import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RAL Color Finder - Free Online Color Tool | ColorKits',
  description: 'Find RAL classic and design colors with digital color equivalents. Free online RAL color finder for industrial and architectural designers. Look up RAL color codes with HEX, RGB, and CMYK conversions.',
  keywords: ['ral finder', 'ral colors', 'ral color lookup', 'ral to hex', 'ral color finder'],
  openGraph: {
    title: 'RAL Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find RAL classic and design colors with digital color equivalents.',
  },
  twitter: {
    title: 'RAL Color Finder - Free Online Color Tool | ColorKits',
    description: 'Find RAL classic and design colors with digital color equivalents.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
