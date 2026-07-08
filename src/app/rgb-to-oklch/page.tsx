import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to OKLCH Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to OKLCH (Lightness, Chroma, Hue) format instantly. Free online RGB to OKLCH converter for modern CSS Color Level 4 color format support.',
  keywords: ['rgb to oklch', 'rgb to oklch converter', 'rgb to oklch color', 'oklch color space', 'rgb converter'],
  openGraph: {
    title: 'RGB to OKLCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to OKLCH (Lightness, Chroma, Hue) format instantly.',
  },
  twitter: {
    title: 'RGB to OKLCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to OKLCH (Lightness, Chroma, Hue) format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
