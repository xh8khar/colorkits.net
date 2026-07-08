import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to OKLCH Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to OKLCH (Lightness, Chroma, Hue) values instantly. Free online HEX to OKLCH converter for modern CSS Color Level 4 color format support.',
  keywords: ['hex to oklch', 'hex to oklch converter', 'oklch converter', 'hex to oklch color', 'oklch color space'],
  openGraph: {
    title: 'HEX to OKLCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to OKLCH (Lightness, Chroma, Hue) values instantly.',
  },
  twitter: {
    title: 'HEX to OKLCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to OKLCH (Lightness, Chroma, Hue) values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
