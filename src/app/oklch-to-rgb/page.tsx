import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLCH to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert OKLCH (Lightness, Chroma, Hue) color values to RGB format instantly. Free online OKLCH to RGB converter for modern CSS Color Level 4 and perceptually uniform color.',
  keywords: ['oklch to rgb', 'oklch to rgb converter', 'oklch color to rgb', 'oklch to rgb value', 'oklch converter'],
  openGraph: {
    title: 'OKLCH to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLCH (Lightness, Chroma, Hue) color values to RGB format instantly.',
  },
  twitter: {
    title: 'OKLCH to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLCH (Lightness, Chroma, Hue) color values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
