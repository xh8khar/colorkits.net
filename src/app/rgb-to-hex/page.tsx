import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'RGB to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert RGB color values to HEX codes instantly. Free online RGB to HEX converter for web developers and designers. Supports rgb(), rgba(), and comma-separated formats with real-time preview.',
  keywords: ['rgb to hex', 'rgb to hex converter', 'rgb color to hex', 'rgb to hex code', 'rgb converter'],
  openGraph: {
    title: 'RGB to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HEX codes instantly.',
  },
  twitter: {
    title: 'RGB to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert RGB color values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
