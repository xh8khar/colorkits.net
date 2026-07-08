import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CMYK to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert CMYK color values to HEX codes for web development. Free online CMYK to HEX converter for print designers moving projects from print to digital.',
  keywords: ['cmyk to hex', 'cmyk to hex converter', 'cmyk to hex code', 'cmyk for web', 'cmyk converter'],
  openGraph: {
    title: 'CMYK to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CMYK color values to HEX codes for web development.',
  },
  twitter: {
    title: 'CMYK to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CMYK color values to HEX codes for web development.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
