import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSL to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HSL color values to HEX codes instantly. Free online HSL to HEX converter for web developers and designers. Enter hue, saturation, and lightness to get your HEX color code.',
  keywords: ['hsl to hex', 'hsl to hex converter', 'hsl to hex code', 'hsl color to hex', 'hsl converter'],
  openGraph: {
    title: 'HSL to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSL color values to HEX codes instantly.',
  },
  twitter: {
    title: 'HSL to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSL color values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
