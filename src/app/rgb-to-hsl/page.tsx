import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to HSL Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to HSL (Hue, Saturation, Lightness) format instantly. Free online RGB to HSL converter for web developers and designers. Supports rgb() and rgba() input formats.',
  keywords: ['rgb to hsl', 'rgb to hsl converter', 'rgb color to hsl', 'rgb to hsl calculator', 'hsl converter'],
  openGraph: {
    title: 'RGB to HSL Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HSL (Hue, Saturation, Lightness) format instantly.',
  },
  twitter: {
    title: 'RGB to HSL Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HSL (Hue, Saturation, Lightness) format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
