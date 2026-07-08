import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LAB to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert CIELAB (L*a*b*) color space values to RGB format instantly. Free online LAB to RGB converter for accurate color space transformation in design workflows.',
  keywords: ['lab to rgb', 'lab to rgb converter', 'lab color to rgb', 'cielab to rgb', 'lab converter'],
  openGraph: {
    title: 'LAB to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CIELAB (L*a*b*) color space values to RGB format instantly.',
  },
  twitter: {
    title: 'LAB to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CIELAB (L*a*b*) color space values to RGB format instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
