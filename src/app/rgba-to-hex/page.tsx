import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGBA to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGBA color values with alpha channel to HEX codes instantly. Free online RGBA to HEX converter for web developers and designers preserving transparency in conversion.',
  keywords: ['rgba to hex', 'rgba to hex converter', 'rgba with alpha to hex', 'rgba to hex code', 'rgba converter'],
  openGraph: {
    title: 'RGBA to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGBA color values with alpha channel to HEX codes instantly.',
  },
  twitter: {
    title: 'RGBA to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGBA color values with alpha channel to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
