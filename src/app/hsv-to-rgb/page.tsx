import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSV to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HSV (Hue, Saturation, Value) color values to RGB format instantly. Free online HSV to RGB converter for designers and developers working with color models.',
  keywords: ['hsv to rgb', 'hsv to rgb converter', 'hsv to rgb color', 'hsv color to rgb', 'hsv converter'],
  openGraph: {
    title: 'HSV to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSV (Hue, Saturation, Value) color values to RGB format instantly.',
  },
  twitter: {
    title: 'HSV to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSV (Hue, Saturation, Value) color values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
