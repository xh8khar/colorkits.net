import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'HSLA to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert HSLA color values with alpha channel to HEX codes. Free online HSLA to HEX converter for web developers needing precise color format conversion with transparency.',
  keywords: ['hsla to hex', 'hsla to hex converter', 'hsla to hex color', 'hsla with alpha', 'hsla converter'],
  openGraph: {
    title: 'HSLA to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSLA color values with alpha channel to HEX codes.',
  },
  twitter: {
    title: 'HSLA to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert HSLA color values with alpha channel to HEX codes.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
