import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to LCH Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to LCH (Lightness, Chroma, Hue) format instantly. Free online RGB to LCH converter for CSS Color Level 4 and advanced color science workflows.',
  keywords: ['rgb to lch', 'rgb to lch converter', 'rgb color to lch', 'rgb to cielch', 'lch converter'],
  openGraph: {
    title: 'RGB to LCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to LCH (Lightness, Chroma, Hue) format instantly.',
  },
  twitter: {
    title: 'RGB to LCH Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to LCH (Lightness, Chroma, Hue) format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
