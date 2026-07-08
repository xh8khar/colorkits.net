import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to HSV Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to HSV (Hue, Saturation, Value) format instantly. Free online RGB to HSV converter for designers working with color picking interfaces.',
  keywords: ['rgb to hsv', 'rgb to hsv converter', 'rgb color to hsv', 'rgb to hsv calculator', 'hsv converter'],
  openGraph: {
    title: 'RGB to HSV Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HSV (Hue, Saturation, Value) format instantly.',
  },
  twitter: {
    title: 'RGB to HSV Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HSV (Hue, Saturation, Value) format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
