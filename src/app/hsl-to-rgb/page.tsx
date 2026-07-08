import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSL to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HSL color values to RGB format instantly. Free online HSL to RGB converter for web developers and designers. Transform hue, saturation, and lightness into rgb() values.',
  keywords: ['hsl to rgb', 'hsl to rgb converter', 'hsl to rgb color', 'hsl to rgb calculator', 'hsl converter'],
  openGraph: {
    title: 'HSL to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSL color values to RGB format instantly.',
  },
  twitter: {
    title: 'HSL to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSL color values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
