import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HEX to HSLA Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HEX color codes to HSLA values with alpha channel. Free online HEX to HSLA converter for web developers and designers. Supports transparency in color conversion.',
  keywords: ['hex to hsla', 'hex to hsla converter', 'hsla converter', 'hex to hsla color', 'hex with alpha'],
  openGraph: {
    title: 'HEX to HSLA Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HSLA values with alpha channel.',
  },
  twitter: {
    title: 'HEX to HSLA Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HEX color codes to HSLA values with alpha channel.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
