import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LCH to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert LCH (Lightness, Chroma, Hue) color values to HEX codes instantly. Free online LCH to HEX converter for CSS Color Level 4 color format support.',
  keywords: ['lch to hex', 'lch to hex converter', 'lch color to hex', 'cie lch to hex', 'lch converter'],
  openGraph: {
    title: 'LCH to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert LCH (Lightness, Chroma, Hue) color values to HEX codes instantly.',
  },
  twitter: {
    title: 'LCH to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert LCH (Lightness, Chroma, Hue) color values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
