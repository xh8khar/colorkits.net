import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to HSV Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to HSV (Hue, Saturation, Value) values instantly. Free online HEX to HSV converter for designers and developers working with color picking interfaces.',
  keywords: ['hex to hsv', 'hex to hsv converter', 'hsv converter', 'hex to hsv color', 'hsv color converter'],
  openGraph: {
    title: 'HEX to HSV Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HSV (Hue, Saturation, Value) values instantly.',
  },
  twitter: {
    title: 'HEX to HSV Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HSV (Hue, Saturation, Value) values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
