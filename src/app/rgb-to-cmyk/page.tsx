import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to CMYK Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to CMYK for print preparation. Free online RGB to CMYK converter for graphic designers and print professionals. Accurate screen-to-print color conversion.',
  keywords: ['rgb to cmyk', 'rgb to cmyk converter', 'cmyk for print', 'rgb to cmyk print', 'cmyk converter'],
  openGraph: {
    title: 'RGB to CMYK Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to CMYK for print preparation.',
  },
  twitter: {
    title: 'RGB to CMYK Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to CMYK for print preparation.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
