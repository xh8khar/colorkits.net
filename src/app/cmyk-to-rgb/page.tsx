import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'CMYK to RGB Converter - Free Online Color Tool | ColorKits',
  description: 'Convert CMYK color values to RGB format for digital displays. Free online CMYK to RGB converter for print designers converting artwork for web and screen use.',
  keywords: ['cmyk to rgb', 'cmyk to rgb converter', 'cmyk to rgb color', 'cmyk for web', 'cmyk converter'],
  openGraph: {
    title: 'CMYK to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CMYK color values to RGB format for digital displays.',
  },
  twitter: {
    title: 'CMYK to RGB Converter - Free Online Color Tool | ColorKits',
    description: 'Convert CMYK color values to RGB format for digital displays.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
