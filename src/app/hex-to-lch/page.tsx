import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to LCH Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to LCH (Lightness, Chroma, Hue) values instantly. Free online HEX to LCH converter supporting CSS Color Level 4 color format.',
  keywords: ['hex to lch', 'hex to lch converter', 'lch color converter', 'hex to lch color', 'cie lch converter'],
  openGraph: {
    title: 'HEX to LCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to LCH (Lightness, Chroma, Hue) values instantly.',
  },
  twitter: {
    title: 'HEX to LCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to LCH (Lightness, Chroma, Hue) values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
