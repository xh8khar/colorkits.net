import type { Metadata } from 'next'
import ToolPageClient from './ToolPageClient'

export const metadata: Metadata = {
  title: 'OKLab to HEX Converter - Free Online Color Tool | ColorKits',
  description: 'Convert OKLab color space values to HEX codes instantly. Free online OKLab to HEX converter for perceptually uniform color representation in modern web applications.',
  keywords: ['oklab to hex', 'oklab to hex converter', 'oklab color to hex', 'oklab to hex code', 'oklab converter'],
  openGraph: {
    title: 'OKLab to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLab color space values to HEX codes instantly.',
  },
  twitter: {
    title: 'OKLab to HEX Converter - Free Online Color Tool | ColorKits',
    description: 'Convert OKLab color space values to HEX codes instantly.',
  },
}

export default function Page() {
  return <ToolPageClient />
}
