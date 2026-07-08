import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSV to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HSV (Hue, Saturation, Value) color values to HEX codes instantly. Free online HSV to HEX converter for designers working with color picker interfaces.',
  keywords: ['hsv to hex', 'hsv to hex converter', 'hsv to hex code', 'hsv color to hex', 'hsv converter'],
  openGraph: {
    title: 'HSV to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSV (Hue, Saturation, Value) color values to HEX codes instantly.',
  },
  twitter: {
    title: 'HSV to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSV (Hue, Saturation, Value) color values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
