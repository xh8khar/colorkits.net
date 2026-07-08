import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to CMYK Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to CMYK values for print preparation. Free online HEX to CMYK converter for graphic designers and print professionals. Accurate color space conversion.',
  keywords: ['hex to cmyk', 'hex to cmyk converter', 'cmyk converter', 'hex to cmyk print', 'cmyk color converter'],
  openGraph: {
    title: 'HEX to CMYK Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to CMYK values for print preparation.',
  },
  twitter: {
    title: 'HEX to CMYK Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to CMYK values for print preparation.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
