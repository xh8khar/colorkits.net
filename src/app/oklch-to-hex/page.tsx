import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLCH to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert OKLCH (Lightness, Chroma, Hue) color values to HEX codes instantly. Free online OKLCH to HEX converter for modern CSS Color Level 4 color format support.',
  keywords: ['oklch to hex', 'oklch to hex converter', 'oklch color to hex', 'oklch to hex code', 'oklch converter'],
  openGraph: {
    title: 'OKLCH to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLCH (Lightness, Chroma, Hue) color values to HEX codes instantly.',
  },
  twitter: {
    title: 'OKLCH to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLCH (Lightness, Chroma, Hue) color values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
