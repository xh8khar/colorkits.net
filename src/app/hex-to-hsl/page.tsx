import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to HSL Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to HSL values instantly. Free online HEX to HSL converter for web developers and designers. Get hue, saturation, and lightness values from any HEX color.',
  keywords: ['hex to hsl', 'hex to hsl converter', 'hsl converter', 'hex to hsl color', 'hsl color converter'],
  openGraph: {
    title: 'HEX to HSL Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HSL values instantly.',
  },
  twitter: {
    title: 'HEX to HSL Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HSL values instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
