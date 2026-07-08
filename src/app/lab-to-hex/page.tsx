import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'LAB to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert CIELAB (L*a*b*) color space values to HEX codes instantly. Free online LAB to HEX converter for accurate, device-independent color representation in web projects.',
  keywords: ['lab to hex', 'lab to hex converter', 'lab color to hex', 'cielab to hex', 'lab converter'],
  openGraph: {
    title: 'LAB to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CIELAB (L*a*b*) color space values to HEX codes instantly.',
  },
  twitter: {
    title: 'LAB to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CIELAB (L*a*b*) color space values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
