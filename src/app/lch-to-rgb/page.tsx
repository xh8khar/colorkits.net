import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LCH to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert LCH (Lightness, Chroma, Hue) color values to RGB format instantly. Free online LCH to RGB converter for modern color space workflows and CSS Color Level 4.',
  keywords: ['lch to rgb', 'lch to rgb converter', 'lch color to rgb', 'cie lch to rgb', 'lch converter'],
  openGraph: {
    title: 'LCH to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert LCH (Lightness, Chroma, Hue) color values to RGB format instantly.',
  },
  twitter: {
    title: 'LCH to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert LCH (Lightness, Chroma, Hue) color values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
